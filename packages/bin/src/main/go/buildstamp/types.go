package buildstamp

type Buildstamp struct {
	GitCommitId string `json:"git_commit_id,omitempty"`
	GitRepoUrl  string `json:"git_repo_url,omitempty"`
	GitRepoName string `json:"git_repo_name,omitempty"`
	Date        string `json:"date,omitempty"`
}

type PackageJson struct {
	Name    string
	Version string
}

type GitInfo struct {
	CommitId string
	RepoUrl  string
	RepoName string
}
