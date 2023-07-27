package core

import (
	"axon-server/src/api/session"
	"axon-server/src/coredb"
	"axon-server/src/types"
	"errors"
	"fmt"
	"sync"
	"time"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
)

type Folder struct {
	Session session.Session
}

func (f *Folder) GetFolderList(a *types.AxonContext) (*[]types.FolderList, error) {
	
	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not fetch folders - " + err.Error())
	}
	
	var folders []types.Folder

	result, err := db.QueryDatabasePartition(coredb.AXON_TABLE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email))
	if err != nil {
		return nil, errors.New("could not fetch folders - " + err.Error())
	}

	// Unmarshal the DynamoDB item into a Folder struct
	if err := dynamodbattribute.UnmarshalListOfMaps(result.Items, &folders); err != nil {
		return nil, err
	}
	
	wg := sync.WaitGroup{}
	res := make([]types.FolderList, len(folders))

	for index, item := range folders {
		i := index    
		wg.Add(1)
		go func(item types.Folder) {
			var folderList types.FolderList
			folderList.UserId = item.UserId
			folderList.FolderID = item.FolderID
			folderList.FolderName = item.FolderName
			folderList.DateCreated = item.DateCreated
			folderList.LastEdited = item.LastEdited

			note := []types.Note{}
			result, _ := db.QueryDatabasePartition(coredb.AXON_TABLE, fmt.Sprintf("NOTE#%s#%s", f.Session.SessionData.User.Email, item.FolderID))
			
			// Unmarshal the DynamoDB item into a Note struct
			dynamodbattribute.UnmarshalListOfMaps(result.Items, &note)

			folderList.Notes = note
			res[i] = folderList
			wg.Done()
		}(item)

	}
	wg.Wait()

	return &res, err

}

func (f *Folder) GetFolders(a *types.AxonContext) (*[]types.Folder, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not fetch folders - " + err.Error())
	}
	
	var folder []types.Folder

	result, err := db.QueryDatabasePartition(coredb.AXON_TABLE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email))

	// Unmarshal the DynamoDB item into a Note struct
	dynamodbattribute.UnmarshalListOfMaps(result.Items, &folder)

	if err != nil {
		return nil, errors.New("could not fetch folder - " + err.Error())
	}
	return &folder, err

}

func (f *Folder) CreateFolder(a *types.AxonContext, folder_name string) (*string, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not create folder - " + err.Error())
	}
	
	//  Create folder object
	folder := types.Folder{
		UserId:      f.Session.SessionData.User.UserId,
		FolderID:    uuid.New().String(),
		FolderName:  folder_name,
		DateCreated: time.Now(),
		LastEdited:  time.Now(),
	}

	// Add folder to database
	err = db.MutateDatabase(coredb.AXON_TABLE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email), folder.FolderID, folder)

	if err != nil {
		return nil, errors.New("could not create folder - " + err.Error())
	}

	return &folder.FolderID, err

}

func (f *Folder) FindFolder(a *types.AxonContext, folder_id string) (*types.Folder, error) {
	
	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not find folder - " + err.Error())
	}

	result, err := db.QueryDatabase(coredb.AXON_TABLE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email), &folder_id)

	if err != nil {
		return nil, errors.New("could not find folder - " + err.Error())
	}

	var folder types.Folder

	// Unmarshal the DynamoDB item into a Folder struct
	dynamodbattribute.UnmarshalMap(result.Item, &folder)

	return &folder, err
}

func (f *Folder) DeleteFolder(a *types.AxonContext, folder_id string) (*string, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not delete folder - " + err.Error())
	}

	err = db.DeleteRecord(coredb.AXON_TABLE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email), &folder_id)

	if err != nil {
		return nil, errors.New("could not delete folder or folder does not exist - " + err.Error())
	}

	return &folder_id, err

}

type FolderAttributes struct {
	FolderName string `json:"folder_name"`
}

func (f *Folder) UpdateFolder(a *types.AxonContext, folder_name string, folder_id string) (*string, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not update folder - " + err.Error())
	}

	attributes := FolderAttributes{
		FolderName: folder_name,
	}

	err = db.UpdateRecord(coredb.AXON_TABLE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email), folder_id, attributes)

	if err != nil {
		return nil, errors.New("could not update folder or folder does not exist - " + err.Error())
	}

	return &folder_id, err

}
