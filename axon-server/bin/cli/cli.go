package cli

import (
	"bytes"
	"flag"
	"log"
	"os"
	"os/exec"
)

func ParseArgs() (string, string) {
	var run string
	flag.StringVar(&run, "cmd", "axonserver", "Specify the axonserver service to run")
	var cdkCmd string
	flag.StringVar(&cdkCmd, "cdk-cmd", "", "Specify the cdk command to run")

	flag.Parse()

	if run == "cdk" && cdkCmd == "" {
		log.Fatal("No cdk command provided")
		os.Exit(1)
	}

	return run, cdkCmd

}

func RunCommand(inputCmd string) (string) {
		// Execute the CDK CLI command using os/exec
		cmd := exec.Command(inputCmd)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
	
		err := cmd.Run()
		if err != nil {
			log.Fatalf("Failed to run cdk %s: %v", inputCmd, err)
		}

		// Capture the stdout using a bytes.Buffer
		var stdoutBuffer bytes.Buffer
		cmd.Stdout = &stdoutBuffer

		// Convert the stdout buffer to a string and return it
		stdout := stdoutBuffer.String()
		return stdout
}