package main

import (
	"flag"
	"log"
	"os"
	"path"
	. "github.com/qiwi/buildstamp/packages/bin/src/main/go/buildstamp"
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
	flag.BoolVar(&optCi, "ci", true, "Capture CI digest")
	flag.BoolVar(&optDate, "date", true, "Attach ISO8601 date")
	flag.StringVar(&optExtra, "extra", "{}", "JSON mixin to inject")
	flag.StringVar(&optCwd, "cwd", Cwd(), "Working directory")
}

func main() {
	flag.Parse()

	var output = path.Join(optCwd, optOutput)

	var buildstamp = GetBuildstamp(BuildstampOpts{
		optGit,
		optCi,
		optDate,
		optExtra,
		optCwd,
	})

	if os.WriteFile(output, []byte(buildstamp), 0644) != nil {
		log.Fatal("Ooops")
	}
}
