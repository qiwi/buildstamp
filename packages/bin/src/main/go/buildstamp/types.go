package buildstamp

type Digest struct {
	Git  GitDigest   `json:"git"`
	Pkg  PackageJson `json:"pkg"`
	Date string      `json:"date"`
}

type PackageJson struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

type GitDigest struct {
	Hash     string `json:"hash"`
	RepoUrl  string `json:"repoUrl"`
	RepoName string `json:"repoName"`
}
