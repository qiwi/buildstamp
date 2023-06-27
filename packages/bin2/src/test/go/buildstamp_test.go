package buildstamp

import (
	"path/filepath"
	"strings"
	"testing"
)
import (
	. "../../main/go/buildstamp"
)

func TestGetGitInfo(t *testing.T) {
	gitInfo := GetGitInfo(Cwd())
	expected := "qiwi/buildstamp.git"

	if strings.Contains(gitInfo.RepoUrl, expected) {
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
