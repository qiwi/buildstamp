package buildstamp

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)
import (
	. "github.com/qiwi/buildstamp/packages/bin/src/main/go/buildstamp"
)

func TestGetGitInfo(t *testing.T) {
	gitInfo := GetGitInfo(Cwd())
	expected := "qiwi/buildstamp"

	if !strings.Contains(gitInfo.RepoUrl, expected) {
		t.Errorf("got %q, wanted %q", gitInfo.RepoUrl, expected)
	}
}

func TestGetPkgInfo(t *testing.T) {
	pkgInfo := GetPkgInfo(filepath.Join(Cwd(), "../../.."))
	name := "@qiwi/buildstamp-bin"

	if pkgInfo.Name != name {
		t.Errorf("got %q, wanted %q", pkgInfo.Name, name)
	}
}

func TestGetCIInfo(t *testing.T) {
	if err := os.Setenv("BUILD_NUMBER", "123"); err != nil {
		panic(err)
	}

	ciInfo := GetCIInfo()
	ciRunId := "123"
	if ciInfo.RunId != ciRunId {
		t.Errorf("got %q, wanted %q", ciInfo.RunId, ciRunId)
	}
}
