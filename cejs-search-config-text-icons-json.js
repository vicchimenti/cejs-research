/***
 *     @author Peter Briers
 *     @file text/icons-json 
 *     @see CEJS Course
 *              ID: 7763
 *              text/icons-json  
 *
 *
 *	   Used existing PL code from CEJS content type as a starting point.
 *
 *     Generates JSON containing details of Icons, this is used to feed the image and name into the icon search filters
 *
 *     @version 1.3
 */



/***
 *      Import T4 Utilities
 */
importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.publish.utils.BrokerUtils);
importClass(com.terminalfour.media.utils.ImageInfo);




/***
 *      Returns a media object
 */
function getMediaInfo(mediaID) {

    let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
    let media = mediaManager.get(mediaID, language);

    return media;
}




/***
 *      Returns a media stream object
 */
function readMedia(mediaID) {

    let mediaObj = getMediaInfo(mediaID);
    let oMediaStream = mediaObj.getMedia();

    return oMediaStream;
}




/***
*      Returns a formatted html img tag
*/
function mediaTag(itemId) {
   let mediaPath = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="media" formatter="path/*" id="' + itemId + '" cdn="true" pxl-filter-id="69" />');
   let mediaInfo = getMediaInfo(itemId);
   let media = readMedia(itemId);
   let info = new ImageInfo();
   info.setInput(media);
   let mediaObj = (info.check()) ? 
                   {
                       path: mediaPath,
                       label: mediaInfo.getName(),
                       desc: mediaInfo.getDescription()
                   }
                    :
                   {};

   return mediaObj;
}



/***
 *      Main
 */
try {

   // icon IDs
      let iconDetailsArray = {};
   let iconArray = [];
   iconArray.push(4786668); //LSAP 1 Response to the Cry of the Earth
   iconArray.push(4786676); //LSAP 2 Response to the Cry of the Poor
   iconArray.push(4786680); //LSAP 3 Ecological Economics
   iconArray.push(4786684); //LSAP 4 Adoption of Sustainable Lifestyles
   iconArray.push(4786688); //LSAP 5 Ecological Education
   iconArray.push(4786692); //LSAP 6 Ecological Spirituality
   iconArray.push(4786696); //LSAP 7 Community Resilience and Empowerment
   //iconArray.push(4877462); //LSAP All Wheel Goals

   iconArray.push(3694343); //SDG 1 No Poverty
   iconArray.push(3694347); //SDG 2 Zero Hunger
   iconArray.push(3694352); //SDG 3 Good Health
   iconArray.push(3694356); //SDG 4 Quality Education
   iconArray.push(3694360); //SDG 5 Gender Equality
   iconArray.push(3694364); //SDG 6 Clean Water
   iconArray.push(3694368); //SDG 7 Affordable and Clean Energy
   iconArray.push(3694373); //SDG 8 Economic Growth
   iconArray.push(3694377); //SDG 9 Industry
   iconArray.push(3694381); //SDG 10 Reduced Inequalities
   iconArray.push(3694385); //SDG 11 Sustainable Cities
   iconArray.push(3694389); //SDG 12 Responsible Consumption
   iconArray.push(3694393); //SDG 13 Climate Action
   iconArray.push(3694397); //SDG 14 Below Water
   iconArray.push(3694401); //SDG 15 On Land
   iconArray.push(3694405); //SDG 16 Peace
   iconArray.push(3694409); //SDG 17 PartnershipsSA
   //iconArray.push(3780206); //SDG All Wheel


   /***
     *  Parse and format icons
     * 
     * */
   if (iconArray) {

       for (let icon in iconArray) {
           iconDetailsArray[iconArray[icon]] = mediaTag(iconArray[icon]);
       }
   }
    

    /***
     *  write JSON
     * 
     * */

   var jsonObj = new org.json.JSONObject(iconDetailsArray);
   document.write(jsonObj.toString());


} catch (err) {
   document.write(err.message);
}