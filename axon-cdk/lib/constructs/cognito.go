package cdk_constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsamplify"
	"github.com/aws/aws-cdk-go/awscdk/v2/awscognito"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)
  
  type CognitoProps struct {
	UserPoolId string
	UserPoolName string
	AmplifyAuthAppId string
	AmplifyAuthAppName string
  }
  
  func CognitoStack(scope constructs.Construct, id string, props *CognitoProps) awscognito.UserPool {
    
	// Create Cognito user pool
	userPool := awscognito.NewUserPool(scope, &props.UserPoolId, &awscognito.UserPoolProps{
		UserPoolName: jsii.String(props.UserPoolName),
	})

	// create Cognito User Pool Domain
	// userPoolDomain := awscognito.NewUserPoolDomain(stack, jsii.String("MyUserPoolDomain"), &awscognito.UserPoolDomainProps{
	// 	UserPool: userpool,
	// 	CognitoDomain: &awscognito.CognitoDomainOptions{
	// 		DomainPrefix: jsii.String("myauth"),
	// 	},
	// })

	// Add GoogleProvider
	googleProvider := awscognito.NewUserPoolIdentityProviderGoogle(scope, jsii.String("Google"), &awscognito.UserPoolIdentityProviderGoogleProps{
		UserPool: userPool,
		ClientId: jsii.String("1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com"),
		ClientSecret: jsii.String("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"),
		IssuerUrl: jsii.String("https://accounts.google.com"),
		AttributeMapping: &awscognito.AttributeMapping{
			Email: awscognito.ProviderAttribute_GOOGLE_EMAIL(),
			GivenName: awscognito.ProviderAttribute_GOOGLE_GIVEN_NAME(),
			FamilyName: awscognito.ProviderAttribute_GOOGLE_FAMILY_NAME(),
			ProfilePicture: awscognito.ProviderAttribute_GOOGLE_PICTURE(),
		},
		Scopes: &[]*string{
			jsii.String("openid"),
			jsii.String("email"),
			jsii.String("profile"),
		},
	})

	appleProvider := awscognito.NewUserPoolIdentityProviderApple(scope, jsii.String("Apple"), &awscognito.UserPoolIdentityProviderAppleProps{
		UserPool: userPool,
		ClientId: jsii.String("com.example.app"),
		TeamId: jsii.String("teamId"),
		KeyId: jsii.String("keyId"),
		PrivateKey: jsii.String("-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----"),
		AttributeMapping: &awscognito.AttributeMapping{
			Email: awscognito.ProviderAttribute_APPLE_EMAIL(),
			GivenName: awscognito.ProviderAttribute_APPLE_FIRST_NAME(),
			FamilyName: awscognito.ProviderAttribute_APPLE_LAST_NAME(),
			ProfilePicture: awscognito.ProviderAttribute_Other(jsii.String("profilePicture")),
		},
		Scopes: &[]*string{
			jsii.String("openid"),
			jsii.String("email"),
			jsii.String("profile"),
		},
	})

	githubProvider := awscognito.NewUserPoolIdentityProviderOidc(scope, jsii.String("Github"), &awscognito.UserPoolIdentityProviderOidcProps{
		UserPool: userPool,
		ClientId: jsii.String("217b964c39c3e29b9d4e"),
		ClientSecret: jsii.String("d8d92cd49ab01fe3eb4e1088d45f013cebb19039"),
		AttributeMapping: &awscognito.AttributeMapping{
			Email: awscognito.ProviderAttribute_Other(jsii.String("email")),
			GivenName: awscognito.ProviderAttribute_Other(jsii.String("given_name")),
			FamilyName: awscognito.ProviderAttribute_Other(jsii.String("family_name")),
			ProfilePicture: awscognito.ProviderAttribute_Other(jsii.String("picture")),
		},
		Scopes: &[]*string{
			jsii.String("openid"),
			jsii.String("email"),
			jsii.String("profile"),
		},
	})

  	userPoolClient := userPool.AddClient(jsii.String("app-client"), &awscognito.UserPoolClientOptions{
		SupportedIdentityProviders: &[]awscognito.UserPoolClientIdentityProvider{
			awscognito.UserPoolClientIdentityProvider_APPLE(),
			awscognito.UserPoolClientIdentityProvider_GOOGLE(),
			awscognito.UserPoolClientIdentityProvider_Custom(jsii.String("github")),
		},
	})
	
	userPool.RegisterIdentityProvider(googleProvider);
	userPool.RegisterIdentityProvider(appleProvider);
	userPool.RegisterIdentityProvider(githubProvider);

	// // log user pool client ID
	awscdk.NewCfnOutput(scope, jsii.String("UserPoolClientId"), &awscdk.CfnOutputProps{
		Value: userPoolClient.UserPoolClientId(),
	})

		
  
	// // Add OAuth providers 
	// userPool.AddClient("Client", &awscognito.UserPoolClientOptions{
	//   SupportedIdentityProviders: &[]*string{
	// 	awscognito.ProviderGoogle,
	// 	awscognito.ProviderApple,
	// 	awscognito.ProviderGithub, 
	//   },
	// })
  
	
	
	
	
	// Create Amplify app and auth resource
	amplifyApp := awsamplify.NewCfnApp(scope, &props.AmplifyAuthAppId, &awsamplify.CfnAppProps{
		Name: jsii.String(props.AmplifyAuthAppName),	
	})
	amplifyApp.Node().AddDependency(userPoolClient);

  
	// authResource := app.AddAuth("Auth", &awsamplify.AuthProps{
	//   Oauth: &awsamplify.OAuthSettings{
	// 	OpenIdConnectConfig: &awsamplify.OpenIdConnectConfigOptions{
	// 	  OpenIdConnectProviderArn: userPool.OpenIdConnectProviderArn,
	// 	}, 
	// 	OAuthGrantType: awsamplify.OAuthGrantType_AUTH_CODE_GRANT,
	//   },
	// })  
  
	// authResource.OverrideAuthConfig(&map[string]interface{}{
	//   "oauth": map[string]interface{}{
	// 	"openIdProviders": []interface{}{
	// 	  "Google", 
	// 	  "Apple", 
	// 	  "GitHub", 
	// 	},
	//   },
	// })
  
	return userPool
  }