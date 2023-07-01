package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"strings"
	"time"
)

import (
	. "./buildstamp"
)

var (
	optOutput string
	optGit    bool
	optDate   bool
	optExtra  string
)

func init() {
	flag.StringVar(&optOutput, "output", "buildstamp.json", "Buildstamp file destination")
	flag.BoolVar(&optGit, "git", true, "Collect git info")
	flag.BoolVar(&optDate, "date", true, "Attach ISO8601 date")
	flag.StringVar(&optExtra, "extra", "{}", "JSON mixin to inject")
}

func main() {
	flag.Parse()

	var (
		cwd     = Cwd()
		date    string
		gitInfo GitInfo
		extra   map[string]string
	)

	if optDate {
		date = time.Now().Format(time.RFC3339)
	}

	if optGit {
		gitInfo = GetGitInfo(cwd)
	}

	if err := json.Unmarshal([]byte(optExtra), &extra); err != nil {
		panic(err)
	}

	var buildstamp = Buildstamp{
		gitInfo.CommitId,
		gitInfo.RepoUrl,
		gitInfo.RepoName,
		date,
	}
	var stamp, _ = json.MarshalIndent(buildstamp, "", "  ")
	buildstampJson := mixin(string(stamp[:]), extra)

	if os.WriteFile("buildstamp.json", []byte(buildstampJson), 0644) != nil {
		log.Fatal("Ooops")
	}
}

func mixin(target string, data map[string]string) string {
	result := strings.TrimRight(target, ",\n}")
	for k := range data {
		result += fmt.Sprintf(",\n  \"%s\": \"%s\"", k, data[k])
	}

	return result + "\n}"
}
