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
	var gitInfo = GetGitInfo()
	var pkgInfo = GetPkgInfo()
	var date = time.Now().Format(time.RFC3339)

	var digest = Digest{gitInfo, pkgInfo, date}

	digestJson, _ := json.MarshalIndent(digest, "", "  ")

	if os.WriteFile("buildstamp.json", digestJson, 0644) != nil {
		log.Fatal("Ooops")
	}
}
