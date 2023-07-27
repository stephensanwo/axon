Axon Table Schema:
------------------
Table Name: axon
Partition Key: partition_key (String)  // "<USER#firstname.lastname@email.com>"
Sort Key: email (String) // <firstname.lastname@email.com>

User Schema:
------------------
Table Name: axon
Partition Key: <USER#firstname.lastname@email.com>
Sort Key: <firstname.lastname@email.com

Folder Schema:
------------------
Table Name: axon
Partition Key: <FOLDER#firstname.lastname@email.com>
Sort Key: <firstname.lastname@email.com
UserId: <user_id>
FolderId: <folder_id>
Name: <folder_name>
DateCreated:<date>
LastEdited:<date_time>
Notes:<[]>
