package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"
	"path"
	"time"
)

import (
	. "./buildstamp"
)

var (
	optOutput string
	optGit    bool
	optCi     bool
	optDate   bool
	optExtra  string
	optCwd    string
)

func init() {
	flag.StringVar(&optOutput, "output", "buildstamp.json", "Buildstamp file destination")
	flag.BoolVar(&optGit, "git", true, "Collect git info")
	flag.BoolVar(&optCi, "co", true, "Capture CI digest")
	flag.BoolVar(&optDate, "date", true, "Attach ISO8601 date")
	flag.StringVar(&optExtra, "extra", "{}", "JSON mixin to inject")
	flag.StringVar(&optCwd, "cwd", Cwd(), "Working directory")
}

func main() {
	flag.Parse()

	var (
		date    string
		gitInfo GitInfo
		ciInfo  CIInfo
		extra   map[string]string
		output  = path.Join(optCwd, optOutput)
	)

	if optDate {
		date = time.Now().Format(time.RFC3339)
	}

	if optGit {
		gitInfo = GetGitInfo(optCwd)
	}

	if optCi {
		ciInfo = GetCIInfo()
	}

	if err := json.Unmarshal([]byte(optExtra), &extra); err != nil {
		panic(err)
	}

	var buildstamp, _ = json.MarshalIndent(Buildstamp{
		gitInfo.CommitId,
		gitInfo.RepoUrl,
		gitInfo.RepoName,
		date,
		ciInfo.RunId,
		ciInfo.RunUrl,
	}, "", "  ")
	var buildstampWithExtra = Mixin(string(buildstamp[:]), extra)

	if os.WriteFile(output, []byte(buildstampWithExtra), 0644) != nil {
		log.Fatal("Ooops")
	}
}
