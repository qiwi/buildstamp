package buildstamp

type BuildstampOpts struct {
	Git    bool
	Ci     bool
	Date   bool
	Extra  string
	Cwd    string
}

type Buildstamp struct {
	Date            string `json:"date,omitempty"`
	GitCommitId     string `json:"git_commit_id,omitempty"`
	GitCommitBranch string `json:"git_commit_branch,omitempty"`
	GitRepoUrl      string `json:"git_repo_url,omitempty"`
	GitRepoName     string `json:"git_repo_name,omitempty"`
	CIRunId         string `json:"ci_run_id,omitempty"`
	CIRunUrl        string `json:"ci_run_url,omitempty"`
}

type PackageJson struct {
	Name    string
	Version string
}

type CIInfo struct {
	RunId  string
	RunUrl string
}

type GitInfo struct {
	CommitId     string
	CommitBranch string
	RepoUrl      string
	RepoName     string
}
