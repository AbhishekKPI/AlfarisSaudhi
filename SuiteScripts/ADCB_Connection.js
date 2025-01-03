/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

define(['N/sftp', 'N/file', 'N/log'], function (sftp, file, log) {
    function execute(context) {




        // Set objSFTPparams to confirm values are correct
        var objSFTPparams = {
            username: '11204600',  // SFTP username
            passwordGuid: '1f279d95252f435496a01c8b4b24aa26',  // Valid password GUID for authentication
            url: '94.203.239.53',  // Set the IP address here, no sftp:// prefix
            port: 1922,  // Port number
            hostKeyType: 'rsa',
            hostKey: 'AAAAB3NzaC1yc2EAAAABEQAAAQEAx/q78FsQ3WZWK838/6W7xdocxCkNyTsd4XnhHmKi9i7Ehp0sxO7FzKxZI3ZW5Njg/j2Wx2wwRyEfBhg3UKMXbwZMzYqNcXjq0lo7RACV/c6mFiYNXBSv1h7UtRpaG7z6TKl3P9hsr0f76gO0D5Hm2Ll7wR8iLhso9u8QbMuBrQjTfJUqM1Z7zHanxgvBqwVon3xas4oHS7HYNqNbOWVHp20IqNpWixd7kauNuk4cLVGwaY0m7C2ffXvYgzzHf1DSsUw0Jj2vj48R5sP/sm++I6EawairKLxpBnCx6IzvqT073ePQ8ycdtwiDoJjup2X2pCc1tzvMjMFvSff1PrplFw=='
        };

        try {
            log.debug('Attempting SFTP Connection with params', objSFTPparams);
            sftp.createConnection(objSFTPparams);
            log.debug('Connection successful');
        } catch (e) {
            log.error('Connection failed', JSON.stringify(e));
        }

        // Download File Example

    }

    return {
        execute: execute
    };
});
