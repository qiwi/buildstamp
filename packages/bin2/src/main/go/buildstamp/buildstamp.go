package buildstamp

import (
	"bytes"
	"encoding/json"
	"errors"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func Cwd() string {
	ex, err := os.Executable()
	if err != nil {
		panic(err)
	}
	return filepath.Dir(ex)
}

func GetPkgInfo() PackageJson {
	var file, _ = os.ReadFile("./package.json")
	var data = PackageJson{}

	_ = json.Unmarshal([]byte(file), &data)

	return data
}

func GetGitInfo() GitDigest {
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
