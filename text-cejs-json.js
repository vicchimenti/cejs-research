/***
 *     @author Victor Chimenti, MSCS
 *     @file text/cejs-json (based off v10/text/new-fulltext.js)
 *     @see CEJS Research
 *              ID: 5945
 *              text/cejs-json 
 *
 *     Document will write client side to output JSON for the search
 *
 *	   Used existing PL code as a starting point, adapted to file Terminalfour PHP Search Module
 *
 *     @version 1.0
 */



/***
 *      Import T4 Utilities
 */
importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.publish.utils.BrokerUtils);
importClass(com.terminalfour.media.utils.ImageInfo);




/***
 *      Extract values from T4 element tags
 *      and confirm valid existing content item field
 */
 function getContentValues(tag) {
    try {
        let _tag = String(BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)).trim();
        return _tag == '' ? '' : _tag;
    } catch (error) {
        return {
            isError: true,
            message: error.message
        };
    }
}




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

   let mediaHTML = (info.check()) ?
                   '<figure class="figure"><img src="' + mediaPath + '" class="listgroupImage figure-img img-fluid" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" loading="auto" /></figure>' :
                   '<span class="listgroupImage visually-hidden hidden">Invalid Image ID</span>';

   return mediaHTML;
}




/***
*      Returns an array of list items
*/
function assignSdgList(arrayOfValues) {

   let listValues = '';

   for (let i = 0; i < arrayOfValues.length; i++) {

       listValues += '<li class="list-group-item sdgIcon">' + arrayOfValues[i].trim() + '</li>';
   }

   return listValues;
}




/***
*      Returns an array of sdg items
*/
function assignLsapList(arrayOfValues) {

   let listValues = '';

   for (let i = 0; i < arrayOfValues.length; i++) {

       listValues += '<li class="list-group-item lsapIcon">' + arrayOfValues[i].trim() + '</li>';
   }

   return listValues;
}


/***
 *      Main
 */
try {


    /***
     *      Dictionary of content
     * */
    let cejsrDict = {

       contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
       articleTitle: getContentValues('<t4 type="content" name="Article Title" output="normal" modifiers="striptags,htmlentities" />'),
       cejsName: '',
       cejsType: 'research',
       school: getContentValues('<t4 type="content" name="Research College" output="normal" display_field="value" />'),
       department: getContentValues('<t4 type="content" name="Department" output="normal" modifiers="striptags,htmlentities" />'),
       subtitleString: '',
       icons: getContentValues('<t4 type="content" name="SDG Media IDs" output="normal" modifiers="striptags,htmlentities" />'),
          iconsString: '',
       lsapIcons: getContentValues('<t4 type="content" name="Laudato Si Media IDs" output="normal" modifiers="striptags,htmlentities" />'),   
       lsapIconsString: '',
       description: getContentValues('<t4 type="content" name="Research Description" output="normal" modifiers="medialibrary,nav_sections" />'),
       sectionId: getContentValues('<t4 type="content" name="Section ID" output="normal" modifiers="striptags,htmlentities" />'),
       contentId: getContentValues('<t4 type="meta" meta="content_id" />'),
       url: getContentValues('<t4 type="content" name="Article Title" output="fulltext" use-element="true" filename-element="Article Title" modifiers="striptags,htmlentities" />'),
       publisher: getContentValues('<t4 type="content" name="Publisher" output="normal" modifiers="striptags,htmlentities" />'),
       journalLink: getContentValues('<t4 type="content" name="Journal Link" output="normal" modifiers="striptags,htmlentities" />'),
       fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
          faculty: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'), //faculty filter uses full name element?
       bioLink: getContentValues('<t4 type="content" name="Faculty Bio Link" output="normal" modifiers="striptags,htmlentities" />'),
       citations: getContentValues('<t4 type="content" name="Citations" output="normal" modifiers="striptags,htmlentities" />'),
       researchType: getContentValues('<t4 type="content" name="Type" output="normal" modifiers="striptags,htmlentities" />'),
          typeString: '',
       citationString: '',
       fullNameString: '',
       linkString: '',
       descriptionString: '',
          courseLevel: ''
    };

  

    /***
     *  check for fulltext content
     * 
     * */
   cejsrDict.cejsName =  String((cejsrDict.articleTitle)
                       ? cejsrDict.articleTitle
                       : cejsrDict.contentName);
  
      /***
    *  check for description
    * 
    * */
   cejsrDict.descriptionString = String((cejsrDict.description.content) ?
      '<p class="card-text description"><em>' + cejsrDict.description.content + '</em></p>' :
      '<p class="card-text description visually-hidden hidden">No valid description provided</p>');


    /***
    *  check for subject Description
    * 
    * */
   let departmentSpan = (cejsrDict.department) ?
       '<span class="card-text department"><em>' + cejsrDict.department + '</em></span>' :
       '<span class="card-text department visually-hidden hidden">No valid department provided</span>';




   /***
    *  check for subject college
    * 
    * */
   let collegeSpan = (cejsrDict.school) ?
       '<span class="card-text college">' + cejsrDict.school + '</span>' :
       '<span class="card-text college visually-hidden hidden">No valid college provided</span>';




   /***
    *  define subtitle
    * 
    * */
   cejsrDict.subtitleString = String((cejsrDict.department && cejsrDict.school) ?
       departmentSpan + ' | ' + collegeSpan :
       (cejsrDict.department && !cejsrDict.school) ?
       departmentSpan :
       (!cejsrDict.department && cejsrDict.school) ?
       collegeSpan :
       '<span class="card-subtitle visually-hidden hidden">No valid subtitle provided</span>');
  
  

   /***
    *  check for url
    * 
    * */
   cejsrDict.linkString = String((cejsrDict.journalLink && cejsrDict.publisher) ?
      '<p class="card-text journalLink"><a href="' + cejsrDict.journalLink + '" class="card-link" title="Visit the publisher: ' + cejsrDict.publisher + '" target="_blank"><em>' + cejsrDict.publisher + '</em></a></p>' :
      '<p class="card-text journalLink visually-hidden hidden">No valid subject provided</p>');




  /***
    *  check for fullname
    * 
    * */
   cejsrDict.fullNameString = String((cejsrDict.fullName && cejsrDict.bioLink) ?
      '<p class="card-text fullName"><strong><a href="' + cejsrDict.bioLink + '" class="card-link" title="Visit the bio of ' + cejsrDict.fullName + '" target="_blank">' + cejsrDict.fullName + '</a></strong></p>' :
      (cejsrDict.fullName && !cejsrDict.bioLink) ?
      '<p class="card-text fullName"><strong>' + cejsrDict.fullName + '</strong></p>' :
      '<p class="card-text fullName visually-hidden hidden">No valid name provided</p>');



  /***
    *  check for citations
    * 
    * */
   cejsrDict.citationString = String((cejsrDict.citations) ?
      '<p class="card-text citations">' + cejsrDict.citations + '</p>' :
      '<p class="card-text citations visually-hidden hidden">No valid citation provided</p>');


  /***
    *  check for Research type
    * 
    * */
   cejsrDict.typeString = String((cejsrDict.researchType) ?
      '<span class="card-text text-muted researchType">' + cejsrDict.researchType + '</span>' :
      '<span class="card-text researchType visually-hidden hidden">No valid type provided</span>');


   /***
     *  Parse and format icons
     * 
     * */
   if (cejsrDict.icons) {

       let iconArray = cejsrDict.icons.split(',');
       let iconPathArray = [];

       iconArray.sort();

       for (let icon in iconArray) {

           iconPathArray[icon] = mediaTag(iconArray[icon].trim());
       }

       let iconValues = assignSdgList(iconPathArray);
       cejsrDict.iconsString = String('<ul class="iconDashboard list-group list-group-horizontal">' + iconValues + '</ul>');
   }




   /***
    *  Parse and format lsap icons
    * 
    * */
   if (cejsrDict.lsapIcons) {

       let iconArray = cejsrDict.lsapIcons.split(',');
       let iconPathArray = [];

       iconArray.sort();

       for (let icon in iconArray) {

           iconPathArray[icon] = mediaTag(iconArray[icon].trim());
       }

       let iconValues = assignLsapList(iconPathArray);
       cejsrDict.lsapIconsString = String('<ul class="lsapIconDashboard list-group list-group-horizontal">' + iconValues + '</ul>');
   }
    

   
    /***
     *  write JSON
     * 
     * */

   var jsonObj = new org.json.JSONObject(cejsrDict);
   document.write(jsonObj.toString() + ',');


} catch (err) {
   document.write(err.message);
}