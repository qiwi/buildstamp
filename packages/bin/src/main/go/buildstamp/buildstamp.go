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
	//if cwd, exists := os.LookupEnv("BUILDSTAMP_CWD"); exists {
	//	if abs, err := filepath.Abs(cwd); err == nil {
	//		return abs
	//	}
	//}

	ex, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	return ex
}

func GetPkgInfo(cwd string) PackageJson {
	var file, _ = os.ReadFile(filepath.Join(cwd, "./package.json"))
	var data = PackageJson{}

	_ = json.Unmarshal([]byte(file), &data)

	return data
}

func GetGitInfo(cwd string) GitDigest {
	var _, hash, _ = invoke("git", []string{"rev-parse", "HEAD"}, cwd)
	var _, repoUrl, _ = invoke("git", []string{"config", "--get", "remote.origin.url"}, cwd)
	var repoName = string(repoUrl[strings.LastIndex(repoUrl, ":")+1 : strings.LastIndex(repoUrl, ".")])

	return GitDigest{
		hash,
		repoUrl,
		repoName,
	}
}

func invoke(cmd string, args []string, dir string) (int, string, string) {
	var outb, errb bytes.Buffer
	var code int = 0

	cp := exec.Command(cmd, args...)
	cp.Dir = dir

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
