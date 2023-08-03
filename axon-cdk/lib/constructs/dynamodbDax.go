package cdk_constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdax"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsec2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsiam"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type DynamoDBDaxStackProps struct {
}

func DynamoDBDaxStack(scope constructs.Construct, id string, props *DynamoDBDaxStackProps) awsdax.CfnCluster {
	// Create a VPC for DAX
	vpc := awsec2.NewVpc(scope, jsii.String("AxonDaxVPC"), &awsec2.VpcProps{
		Cidr: jsii.String("10.0.0.0/16"),
	})

	// Create a DAX subnet group
	daxSubnetGroup := awsdax.NewCfnSubnetGroup(scope, jsii.String("AxonDaxSubnetGroup"), &awsdax.CfnSubnetGroupProps{
		SubnetIds: &[]*string{vpc.VpcId()},
	})

	// Create an IAM role for the DAX service
	daxRole := awsiam.NewRole(scope, jsii.String("AxonDaxRole"), &awsiam.RoleProps{
		AssumedBy: awsiam.NewServicePrincipal(jsii.String("dax.amazonaws.com"), nil),
	})

	// Attach a policy to the DAX role that grants required permissions for DAX
	daxRole.AddManagedPolicy(awsiam.ManagedPolicy_FromAwsManagedPolicyName(jsii.String("AmazonDynamoDBFullAccess")))
	// Add any other policies required for the DAX role here
	

	// Create a DAX cluster
	daxCluster := awsdax.NewCfnCluster(scope, jsii.String("AxonDaxCluster"), &awsdax.CfnClusterProps{
		NodeType:      jsii.String("dax.t3.medium"),
		ReplicationFactor: jsii.Number(3),
		SubnetGroupName: daxSubnetGroup.SubnetGroupName(),
		IamRoleArn:        daxRole.RoleArn(),
	})

	return daxCluster
}