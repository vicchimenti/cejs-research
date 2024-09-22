/***
 *     @author Victor Chimenti, MSCS
 *     @file v10/text/new-fulltext.js (based off v9-fulltext.js)
 *     @see CEJS Research
 *              ID: 5945
 *              v10/text/new-fulltext
 *
 *     Document will write client side once when the page loads
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
        let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();
        return {
            isError: false,
            content: _tag == '' ? null : _tag
        };
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
 *      Write the document
 */
function writeDocument(array) {

    for (let i = 0; i < array.length; i++) {

        document.write(array[i]);
    }
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
       courseName: getContentValues('<t4 type="content" name="Course Name" output="normal" modifiers="striptags,htmlentities" />'),
       college: getContentValues('<t4 type="content" name="Research College" output="normal" display_field="value" />'),
       department: getContentValues('<t4 type="content" name="Department" output="normal" modifiers="striptags,htmlentities" />'),
       icons: getContentValues('<t4 type="content" name="SDG Media IDs" output="normal" modifiers="striptags,htmlentities" />'),
       lsapIcons: getContentValues('<t4 type="content" name="Laudato Si Media IDs" output="normal" modifiers="striptags,htmlentities" />'),             
       researchDescription: getContentValues('<t4 type="content" name="Research Description" output="normal" modifiers="medialibrary,nav_sections" />'),
       primarySectionName: getContentValues('<t4 type="content" name="Primary Section Name" output="normal" modifiers="striptags,htmlentities" />'),
       sectionName: getContentValues('<t4 type="content" name="Section Name" output="normal" modifiers="striptags,htmlentities" />'),
       sectionId: getContentValues('<t4 type="content" name="Section ID" output="normal" modifiers="striptags,htmlentities" />'),
       contentId: getContentValues('<t4 type="meta" meta="content_id" />'),
       anchorTag: getContentValues('<t4 type="meta" meta="html_anchor" />'),
       breadcrumbs: getContentValues('<t4 type="navigation" name="Breadcrumbs" id="955" />'),
       bioLink: getContentValues('<t4 type="content" name="Faculty Bio Link" output="normal" modifiers="striptags,htmlentities" />'),
       citations: getContentValues('<t4 type="content" name="Citations" output="normal" modifiers="striptags,htmlentities" />'),
       researchType: getContentValues('<t4 type="content" name="Type" output="normal" modifiers="striptags,htmlentities" />'),
          publisher: getContentValues('<t4 type="content" name="Publisher" output="normal" modifiers="striptags,htmlentities" />'),
          journalLink: getContentValues('<t4 type="content" name="Journal Link" output="normal" modifiers="striptags,htmlentities" />'),
       fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
          faculty: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
    };




    /***
     *  default html initializations
     * 
     * */
     let openHeaderWrapper = '<div class="hero--basic hero--program-detail bg--dark global-padding--15x with-photo">\n';
        openHeaderWrapper += '<div class="grid-container">\n';
     openHeaderWrapper += '<div class="grid-x grid-margin-x">\n';
     openHeaderWrapper += '<div class="cell auto">\n';
     openHeaderWrapper += '<div class="hero--basic__text text-margin-reset">\n';
     let closeHeaderWrapper = '</div>\n';
        closeHeaderWrapper += '</div>\n';
        closeHeaderWrapper += '</div>\n';
        closeHeaderWrapper += '</div>\n';
        closeHeaderWrapper += '</div>\n';
     let openBodyWrapper = '<section class="program-info global-margin--15x cejs--item">\n';
        openBodyWrapper += '<div class="grid-container">\n';
     openBodyWrapper += '<div class="grid-x grid-margin-x">\n';
        openBodyWrapper += '<div class="cell medium-8">\n';
     let closeBodyWrapper = '</div>\n';
        closeBodyWrapper += '</div>\n';
     closeBodyWrapper += '</div>\n';
        closeBodyWrapper += '</div>\n';
        closeBodyWrapper += '</section>\n';
     let descriptionString = '<p class="card-text courseDescription visually-hidden hidden">No valid description provided</p>';
     let listOfIcons = '<ul class="iconDashboard list-group list-group-horizontal hidden visually-hidden">No valid icon provided</ul>';
     let listOfLsapIcons = '<ul class="lsapIconDashboard list-group list-group-horizontal hidden visually-hidden">No icons provided</ul>';







    /***
     *  check for fulltext content
     * 
     * */
     let titleLink =   (cejsrDict.articleTitle.content)
                       ? '<h1 id="articleTitle">' + cejsrDict.articleTitle.content + '</h1>'
                       : '<h1 id="articleTitle">' + cejsrDict.contentName.content + '</h1>';


   /***
     *  breadcrumb string
     * 
     * */
    let breadcrumbString =   '<div class="global-spacing--3x">' + cejsrDict.breadcrumbs.content + '</div>';


       /***
         *  check for subject Description
         * 
         * */
        let departmentSpan = (cejsrDict.department.content) ?
            '<span class="card-text department"><em>' + cejsrDict.department.content + '</em></span>' :
            '<span class="card-text department visually-hidden hidden">No valid department provided</span>';




        /***
         *  check for subject college
         * 
         * */
        let collegeSpan = (cejsrDict.college.content) ?
            '<span class="card-text college">' + cejsrDict.college.content + '</span>' :
            '<span class="card-text college visually-hidden hidden">No valid college provided</span>';




        /***
         *  define subtitle
         * 
         * */
        let subtitleString = (cejsrDict.department.content && cejsrDict.college.content) ?
            '<p class="card-subtitle">' + departmentSpan + ' | ' + collegeSpan + '</p>' :
            (cejsrDict.department.content && !cejsrDict.college.content) ?
            '<p class="card-subtitle">' + departmentSpan + '</p>' :
            (!cejsrDict.department.content && cejsrDict.college.content) ?
            '<p class="card-subtitle">' + collegeSpan + '</p>' :
            '<span class="card-subtitle visually-hidden hidden">No valid subtitle provided</span>';

  
  
  
       /***
         *  check for citations
         * 
         * */
        let citationString = (cejsrDict.citations.content) ?
           '<p class="card-text citations">' + cejsrDict.citations.content + '</p>' :
           '<p class="card-text citations visually-hidden hidden">No valid citation provided</p>';

  
  
  
  
       /***
         *  check for Research type
         * 
         * */
        let typeString = (cejsrDict.researchType.content) ?
           '<span class="card-text text-muted researchType">' + cejsrDict.researchType.content + '</span>' :
           '<span class="card-text researchType visually-hidden hidden">No valid type provided</span>';
         
  
  
  
  

       /***
         *  check for url
         * 
         * */
        let linkString = (cejsrDict.journalLink.content && cejsrDict.publisher.content) ?
           '<p class="card-text journalLink"><a href="' + cejsrDict.journalLink.content + '" class="card-link" title="Visit the publisher: ' + cejsrDict.publisher.content + '" target="_blank"><em>' + cejsrDict.publisher.content + '</em></a></p>' :
           '<p class="card-text journalLink visually-hidden hidden">No valid subject provided</p>';




       /***
         *  check for fullname
         * 
         * */
        let fullNameString = (cejsrDict.fullName.content && cejsrDict.bioLink.content) ?
           '<p class="card-text fullName"><strong><a href="' + cejsrDict.bioLink.content + '" class="card-link" title="Visit the bio of ' + cejsrDict.fullName.content + '" target="_blank">' + cejsrDict.fullName.content + '</a></strong></p>' :
           (cejsrDict.fullName.content && !cejsrDict.bioLink.content) ?
           '<p class="card-text fullName"><strong>' + cejsrDict.fullName.content + '</strong></p>' :
           '<p class="card-text fullName visually-hidden hidden">No valid name provided</p>';

  
  
  
   /***
     *  Parse and format icons
     * 
     * */
   if (cejsrDict.icons.content) {

       let iconArray = cejsrDict.icons.content.split(',');
       let iconPathArray = [];

       iconArray.sort();

       for (let icon in iconArray) {

           iconPathArray[icon] = mediaTag(iconArray[icon].trim());
       }

       let iconValues = assignSdgList(iconPathArray);
       listOfIcons = '<ul class="iconDashboard list-group list-group-horizontal">' + iconValues + '</ul>';
   }




   /***
    *  Parse and format lsap icons
    * 
    * */
   if (cejsrDict.lsapIcons.content) {

       let iconArray = cejsrDict.lsapIcons.content.split(',');
       let iconPathArray = [];

       iconArray.sort();

       for (let icon in iconArray) {

           iconPathArray[icon] = mediaTag(iconArray[icon].trim());
       }

       let iconValues = assignLsapList(iconPathArray);
       listOfLsapIcons = '<ul class="lsapIconDashboard list-group list-group-horizontal">' + iconValues + '</ul>';
   }




   /***
     *  check for description
     * 
     * */
   if (cejsrDict.researchDescription.content) {
       descriptionString = '<h2>About this Article</h2>\n';
       descriptionString += '<div class="wysiwyg">';
       descriptionString += fullNameString + typeString;
       descriptionString += '<p>' + cejsrDict.researchDescription.content + '</p>';
       descriptionString += citationString + linkString;
       descriptionString += '</div>';
   }


   
    /***
     *  write document once
     * 
     * */
     writeDocument(
       [
           cejsrDict.anchorTag.content,
           openHeaderWrapper,
           titleLink,
             subtitleString,
             breadcrumbString,
           closeHeaderWrapper,
           openBodyWrapper,
             listOfLsapIcons,
           listOfIcons,
           descriptionString,
           closeBodyWrapper,
       ]
   );





} catch (err) {
    document.write(err.message);
}