package cdk_constructs

// import (
// 	"github.com/aws/aws-cdk-go/awscdk/v2"
// 	"github.com/aws/aws-cdk-go/awscdk/v2/awsroute53"
// 	"github.com/aws/aws-cdk-go/awscdk/v2/awssecretsmanager"
// 	"github.com/aws/aws-cdk-go/awscdk/v2/awsses"
// 	"github.com/aws/constructs-go/constructs/v10"
// 	"github.com/aws/jsii-runtime-go"

// )

// type SESEmailProps struct {
// 	HostedZone  awsroute53.IHostedZone
// 	Subdomain   string
// 	SMSSecret   awssecretsmanager.ISecret
// 	AdminEmail  string
// }

// func SESEmail(scope constructs.Construct, id string, props *SESEmailProps) *awsses.EmailIdentity {

// 	// Create SES identity
// 	domainIdentity := awsses.NewCfnEmailIdentity(scope, jsii.String(id+"Identity"), &awsses.CfnEmailIdentityProps{
// 		EmailIdentity: jsii.String(props.Subdomain),
// 	})

// 	// Verify domain identity
// 	awsses.NewCfnIdentityVerification(scope, jsii.String(id+"IdentityVerification"), &awsses.CfnIdentityVerificationProps{
// 		EmailAddress: aws.String("admin@" + props.Subdomain),
// 		Identity:     identity.IdentityArn(),
// 	})

// 	// Set up DNS records for SES
// 	awsroute53.NewTxtRecord(scope, aws.String(id+"SESVerificationRecord"), &awsroute53.TxtRecordProps{
// 		RecordName:  aws.String("_amazonses." + props.Subdomain),
// 		Zone:        props.HostedZone,
// 		Ttl:         awscdk.DurationSeconds(300),
// 		Values:      aws.StringSlice([]string{aws.StringValue(identity.VerificationToken())}),
// 	})

// 	return &SESEmail{
// 		Construct: scope,
// 	}
// }
