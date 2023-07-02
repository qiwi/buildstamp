package buildstamp

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

func GetBuildstamp (opts BuildstampOpts) string {
	var (
		date    string
		gitInfo GitInfo
		ciInfo  CIInfo
		extra   map[string]string
	)

	if opts.Date {
		date = time.Now().Format(time.RFC3339)
	}

	if opts.Git {
		gitInfo = GetGitInfo(opts.Cwd)
	}

	if opts.Ci {
		ciInfo = GetCIInfo()
	}

	if err := json.Unmarshal([]byte(opts.Extra), &extra); err != nil {
		panic(err)
	}

	var buildstamp, _ = json.MarshalIndent(Buildstamp{
		date,
		gitInfo.CommitId,
		gitInfo.RepoUrl,
		gitInfo.CommitId,
		gitInfo.RepoName,
		ciInfo.RunId,
		ciInfo.RunUrl,
	}, "", "  ")

	return Mixin(string(buildstamp[:]), extra)
}

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

func GetGitInfo(cwd string) GitInfo {
	var _, commitId, _ = invoke("git", []string{"rev-parse", "HEAD"}, cwd)
	var _, repoUrl, _ = invoke("git", []string{"config", "--get", "remote.origin.url"}, cwd)
	var repoName = string(repoUrl[strings.LastIndex(repoUrl, ":")+1 : strings.LastIndex(repoUrl, ".")])
	var commitBranch = getCommitBranch(cwd)

	return GitInfo{
		commitId,
		commitBranch,
		repoUrl,
		repoName,
	}
}

func getCommitBranch(cwd string) string {
	var commitBranch = getFirstNonEmpty(os.Getenv("CI_COMMIT_BRANCH"), os.Getenv("GITHUB_REF_NAME"))
	if commitBranch == "" {
		var _, branch, _ = invoke("git", []string{"rev-parse", "--abbrev-ref", "HEAD"}, cwd)
		commitBranch = branch
	}

	return commitBranch
}

func GetCIInfo() CIInfo {
	var runId = getFirstNonEmpty(os.Getenv("BUILD_NUMBER"), os.Getenv("CI_JOB_ID")+os.Getenv("GITHUB_RUN_ID"))
	var runUrl = getFirstNonEmpty(os.Getenv("BUILD_URL"), os.Getenv("GITHUB_RUN_ID"))

	if os.Getenv("GITHUB_RUN_ID") == "" {
		runUrl = os.Getenv("GITHUB_SERVER_URL") + "/" + os.Getenv("GITHUB_REPOSITORY") + "/actions/runs/" + os.Getenv("GITHUB_RUN_ID")
	}

	return CIInfo{runId, runUrl}
}

func getFirstNonEmpty(args ...string) string {
	for _, elem := range args {
		if elem != "" {
			return elem
		}
	}
	return ""
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

func Mixin(target string, data map[string]string) string {
	result := strings.TrimRight(target, ",\n}")
	for k := range data {
		result += fmt.Sprintf(",\n  \"%s\": \"%s\"", k, data[k])
	}

	return result + "\n}"
}
