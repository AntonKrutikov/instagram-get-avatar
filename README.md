Example of getting instagram profile picture by username.

# Firebase Function version (branch firebase-func)

`function/index.mjs`

Overwrite this vars in top of function file:

```js
const username = '' // viewer account login
const password = '' // viewer account pass
const bucketId = '' // firebase bucket id
const bucketPath = 'avatars' // firebase bucket folder
const collectionName = 'instagram' // firestore collection for instagram api metainfo and session
```

# Firebase version without fucntion (branch firebase)

Provide `fireabase_auth.json` from your service account

## Cors

To access files directly from firebase storage in client side, you may need to setup bucket cors:

https://firebase.google.com/docs/storage/web/download-files#cors_configuration

# Example of standalone version from main branch:

1. Get profile info with public api `?__a=1`
2. Get profile_pic_hd url
3. Obtain profile image and store it in firebase storage
4. Response to client side

![example](example.png)

Note: watch on your request rate or you will be blocked from instagram