package main

import (
	"encoding/json"
	"log"
	"os"
	"time"
)

import (
	. "./buildstamp"
)

func main() {
	var cwd = Cwd()
	var gitInfo = GetGitInfo(cwd)
	var pkgInfo = GetPkgInfo(cwd)
	var date = time.Now().Format(time.RFC3339)

	var digest = Digest{gitInfo, pkgInfo, date}

	digestJson, _ := json.MarshalIndent(digest, "", "  ")

	if os.WriteFile("buildstamp.json", digestJson, 0644) != nil {
		log.Fatal("Ooops")
	}
}
