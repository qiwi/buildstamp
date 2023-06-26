package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"
)

type Digest struct {
	Git  GitDigest   `json:"git"`
	Pkg  PackageJson `json:"pkg"`
	Date string      `json:"date"`
}

type PackageJson struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

type GitDigest struct {
	Hash     string `json:"hash"`
	RepoUrl  string `json:"repoUrl"`
	RepoName string `json:"repoName"`
}

func main() {
	var gitInfo = getGitInfo()
	var pkgInfo = getPkgInfo()
	var date = time.Now().Format(time.RFC3339)

	var digest = Digest{gitInfo, pkgInfo, date}

	digestJson, _ := json.MarshalIndent(digest, "", "  ")

	if os.WriteFile("buildstamp.json", digestJson, 0644) != nil {
		log.Fatal("Ooops")
	}
}

func getPkgInfo() PackageJson {
	var file, _ = os.ReadFile("./package.json")
	var data = PackageJson{}

	_ = json.Unmarshal([]byte(file), &data)

	return data
}

func getGitInfo() GitDigest {
	var _, hash, _ = invoke("git", "rev-parse", "HEAD")
	var _, repoUrl, _ = invoke("git", "config", "--get", "remote.origin.url")
	var repoName = string(repoUrl[strings.LastIndex(repoUrl, ":")+1 : strings.LastIndex(repoUrl, ".")])

	return GitDigest{
		hash,
		repoUrl,
		repoName,
	}
}

func invoke(cmd string, args ...string) (int, string, string) {
	var outb, errb bytes.Buffer
	var code int = 0

	cp := exec.Command(cmd, args...)

	cp.Stdout = &outb
	cp.Stderr = &errb

	if errors.Is(cp.Err, exec.ErrDot) {
		cp.Err = nil
	}

	if err := cp.Run(); err != nil {
		if exitError, ok := err.(*exec.ExitError); ok {
			code = exitError.ExitCode()
		}
	}

	return code, strings.Trim(outb.String(), "\n"), strings.Trim(errb.String(), "\n")
}
