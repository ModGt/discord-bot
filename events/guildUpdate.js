module.exports = (oldGuild,newGuild) => {

    if(newGuild.ownerID !== oldGuild.ownerID){
        newGuild.client.updateGuild(newGuild,['ownerID',newGuild.ownerID])
    }


}