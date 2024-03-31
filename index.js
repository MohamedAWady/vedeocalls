const express = require('express');
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token');
const PORT =5868;
const APP_ID = '7a80384e500948528cbe8ca94faa5d4b';
const APP_CERTIFICATE = '68ed757f89ba411894b750907ef1ab2c';
const cors = require('cors')
const app = express();
app.use(cors('*'))

const nocashe =(req,resp,next)=> {

    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires','-1');
    resp.header('Pragma', 'no-cashe');
    next();
    }
const generateAccessToken = (req, resp) => {
    //set response header
    resp.header('Acess-Control-Allow-Origin', '*');
    // get channel name
    const channelName = req.query.channelName;
    // if (!channelName) {
    //     return resp.status(500).json({ 'error': 'channel is required'});

    // }
    //get uid 
    let uid = req.query.uid;
    if (!uid || uid =='')
    {
        uid = 0;
    }
    // get role
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role == 'publisher')
    {
        role = RtcRole.PUBLISHER;

    }
    //get the expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '')
    {
        expireTime =86400;
    }
    else {
        expireTime = parseInt(expireTime,10);
    }
    // calculate privilege expire time
    const currentTime = Math.floor(Date.now() /1000);
    const privilegeExpireTime = currentTime + expireTime;
    //build the token
    const token =RtcTokenBuilder.buildTokenWithUid(APP_ID,APP_CERTIFICATE,channelName, uid,role,privilegeExpireTime);
    //return the token 
    // return resp.json({ 'token':token}); 
    return resp.json({ 'token':'copyrights preserved to Ayman Ahmed Fathi Elsaid Eladl.'}); 
   
   
   
}   


// app.get('/access_token', nocashe, generateAccessToken);
app.get('/access_token', nocashe, generateAccessToken);

app.listen(PORT, () => {
   // console.log('Listening on port: ${PORT}');
   // console.log('Listening on port:'+PORT);
   console.log('ayman ahmed ');
 
});
 
