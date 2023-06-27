package buildstamp

import (
	"testing"
)
import (
	. "../../main/go/buildstamp"
)

func TestGetGitInfo(t *testing.T) {
	gitInfo := GetGitInfo()
	expected := "git@github.com:qiwi/buildstamp.git"

	if gitInfo.RepoUrl != expected {
		t.Errorf("got %q, wanted %q", gitInfo.RepoUrl, expected)
	}
}

//func TestGetPkgInfo(t *testing.T) {
//	pkgInfo := GetPkgInfo()
//	name := "@qiwi/buildstamp-bin"
//
//	if pkgInfo.Name != name {
//		t.Errorf("got %q, wanted %q", pkgInfo.Name, name)
//	}
//}

func TestCwd(t *testing.T) {
	cwd := Cwd()

	name := "@qiwi/buildstamp-bin"

	if cwd != name {
		t.Errorf("got %q, wanted %q", cwd, name)
	}
}
