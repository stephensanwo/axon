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

	result, err := db.QueryDatabase(coredb.AXON_TABLE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email), nil)
	if err != nil {
		return nil, errors.New("could not fetch folders - " + err.Error())
	}

	// Unmarshal the DynamoDB item into a Folder struct
	if err := dynamodbattribute.UnmarshalMap(result.Item, &folders); err != nil {
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
			folderList.Name = item.Name
			folderList.DateCreated = item.DateCreated
			folderList.LastEdited = item.LastEdited

			note := []types.Note{}
			result, _ := db.QueryDatabase(coredb.AXON_TABLE, fmt.Sprintf("NOTE#%s#%s", f.Session.SessionData.User.Email, item.FolderID),  nil)
			
			// Unmarshal the DynamoDB item into a Note struct
			dynamodbattribute.UnmarshalMap(result.Item, &note)

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

	result, err := db.QueryDatabase(coredb.AXON_TABLE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email), nil)

	// Unmarshal the DynamoDB item into a Note struct
	dynamodbattribute.UnmarshalMap(result.Item, &folder)

	if err != nil {
		return nil, errors.New("could not fetch folder - " + err.Error())
	}
	return &folder, err

}

func (f *Folder) CreateFolder(a *types.AxonContext, name string) (*string, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not create folder - " + err.Error())
	}
	
	//  Create folder object
	folder := types.Folder{
		UserId:      f.Session.SessionData.User.UserId,
		FolderID:    uuid.New().String(),
		Name:        name,
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

func (f *Folder) UpdateFolder(a *types.AxonContext, name string, folder_id string) (*string, error) {

	// Create the DynamoDB client
	db, err := coredb.NewDb()
	if err != nil {
		return nil, errors.New("could not update folder - " + err.Error())
	}

	db.UpdateRecord(coredb.AXON_DATABASE, fmt.Sprintf("FOLDER#%s", f.Session.SessionData.User.Email), &folder_id, name)

	if err != nil {
		return nil, errors.New("could not update folder or folder does not exist - " + err.Error())
	}

	return &folder_id, err

}
