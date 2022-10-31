    /***
     *     @author Victor Chimenti, MSCS
     *     @file v9-organizer-cejs-research.js
     *     v9/organizer/cejs/research
     *     id:5945
     *
     *     This content type will work in conjunction with the Organizer and each item
     *     will contain one announcement.
     *
     *     Document will write once when the page loads
     *
     *     @version 9.1
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
      *      Returns an array of sdg items
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
 
        // media path would be a good place to route through get content values to check for nulls and return a detailed error code
         let mediaPath = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="media" formatter="path/*" id="' + itemId + '" />');
         let mediaInfo = getMediaInfo(itemId);
         let media = readMedia(itemId);
         let info = new ImageInfo();
         info.setInput(media);
 
         let mediaHTML = (info.check()) ?
             '<figure class="figure"><img src="' + mediaPath + '" class="listgroupImage figure-img img-fluid" title="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" /></figure><figcaption class="figure-caption visually-hidden hidden">' + mediaInfo.getName() + '</figcaption>' :
             '<span class="listgroupImage visually-hidden hidden">Invalid Image ID</span>';
 
         return mediaHTML;
     }
 
 
 
 
     /***
      *      Returns a formatted html img tag
      */
     function getTarget(itemId) {
 
         let mediaInfo = getMediaInfo(itemId);
         let media = readMedia(itemId);
         let info = new ImageInfo();
         info.setInput(media);
 
         let target = (info.check()) ? '' + mediaInfo.getName() + '' : null;
 
         return target;
     }
 
 
 
 
     /***
      *      Returns an array of list items
      */
     function formatTargets(arrayOfValues) {
 
         let listValues = '';
 
         for (let i = 0; i < arrayOfValues.length; i++) {
 
             if (arrayOfValues[i]) {
                 let cleanValue = arrayOfValues[i].replace(/\s/g, '-');
                 listValues += '' + cleanValue.trim() + ' ';
             }
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
      *  Main
      */
     try {
 
 
         /***
          *      Dictionary of content
          * */
         let cejsrDict = {
 
             contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
             articleTitle: getContentValues('<t4 type="content" name="Article Title" output="normal" modifiers="striptags,htmlentities" />'),
             description: getContentValues('<t4 type="content" name="Research Description" output="normal" modifiers="striptags,htmlentities" />'),
             citations: getContentValues('<t4 type="content" name="Citations" output="normal" modifiers="striptags,htmlentities" />'),
             fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
             firstName: getContentValues('<t4 type="content" name="First Name" output="normal" modifiers="striptags,htmlentities" />'),
             lastName: getContentValues('<t4 type="content" name="Last Name" output="normal" modifiers="striptags,htmlentities" />'),
             college: getContentValues('<t4 type="content" name="College" output="normal" modifiers="striptags,htmlentities" />'),
             department: getContentValues('<t4 type="content" name="Department" output="normal" modifiers="striptags,htmlentities" />'),
             researchFormat: getContentValues('<t4 type="content" name="Paper or Presentation" output="normal" modifiers="striptags,htmlentities" />'),
             researchType: getContentValues('<t4 type="content" name="Type" output="normal" modifiers="striptags,htmlentities" />'),
             publisher: getContentValues('<t4 type="content" name="Publisher" output="normal" modifiers="striptags,htmlentities" />'),
             journalLink: getContentValues('<t4 type="content" name="Journal Link" output="normal" modifiers="striptags,htmlentities" />'),
             sourceDate: getContentValues('<t4 type="content" name="Source Date" output="normal" modifiers="striptags,htmlentities" />'),
             icons: getContentValues('<t4 type="content" name="SDG Media IDs" output="normal" modifiers="striptags,htmlentities" />'),
             lsapIcons: getContentValues('<t4 type="content" name="Laudato Si Media IDs" output="normal" modifiers="striptags,htmlentities" />'),
             fullTextLink: getContentValues('<t4 type="content" name="Article Title" output="fulltext" use-element="true" filename-element="Article Title" modifiers="striptags,htmlentities" />'),
             contentId: getContentValues('<t4 type="meta" meta="content_id" />')
 
         };
 


         
         /***
          *  default html initializations
          * 
          * */
         let endingHTML = '</article>';
         let openCardHeader = '<div class="card-header border-0 bg-transparent">';
         let closeCardHeader = '</div>';
         let openBodyWrapper = '<div class="articleSummary card-body">';
         let closeBodyWrapper = '</div>';
         let listOfIcons = '<ul class="iconDashboard list-group list-group-horizontal hidden visually-hidden">No icons provided</ul>';
         let listOfLsapIcons = '<ul class="lsapIconDashboard list-group list-group-horizontal hidden visually-hidden">No icons provided</ul>';

 



        /***
          *  define wrapper
          * 
          * */
         let beginningHTML =    (cejsrDict.articleTitle.content) ?
                                '<article class="cejsResearchWrapper card shadow border-0 radius-0 mb-3" id="cejsResearch' + cejsrDict.contentId.content + 'zonea" role="contentinfo" aria-label="' + cejsrDict.articleTitle.content + '">' :
                                '<article class="cejsResearchWrapper card shadow border-0 radius-0 mb-3" id="cejsResearch' + cejsrDict.contentId.content + 'zonea" role="contentinfo" aria-label="' + cejsrDict.contentName.content + '">';





 
  

         /***
          *  check for fulltext content
          * 
          * */
         let titleLink = (cejsrDict.articleTitle.content) ?
            //  '<h3 class="card-title border-0"><a href="' + cejsrDict.fullTextLink.content + '" class="card-link" title="See the full course details: ' + cejsrDict.articleTitle.content + '">' + cejsrDict.courseName.content + ' : ' + cejsrDict.articleTitle.content + '</a></h3>' :
            //  (cejsrDict.articleTitle.content && !cejsrDict.courseName.content) ?
            //  '<h3 class="card-title border-0"><a href="' + cejsrDict.fullTextLink.content + '" class="card-link" title="See the full course details: ' + cejsrDict.articleTitle.content + '">' + cejsrDict.articleTitle.content + '</a></h3>' :
            //  '<h3 class="card-title border-0">' + cejsrDict.contentName.content + '</h3>';
 
 
 

         /***
          *  check for summaryDescription
          *  find string length and truncate
          * 
          * */
        //  let maxLength = 200;
        //  let plainString = (cejsrDict.summaryDescription.content) ? '' + cejsrDict.summaryDescription.content +  '' : null;
        //  let actualLength = (plainString) ? plainString.length : null;
        //  let summarySubstring = (plainString && actualLength && actualLength > maxLength) ?
        //                         plainString.substring(0, maxLength) :
        //                         (plainString && actualLength && actualLength <= maxLength) ?
        //                         plainString.substring(0, actualLength) :
        //                         null;
                                
                                


        /***
          *  format summary
          * 
          * */
        //  let summaryString =    (summarySubstring && cejsrDict.articleTitle.content) ?
        //                         '<p class="card-text shortSummary">' + summarySubstring + '... <span class="readMore"><a href="' + cejsrDict.fullTextLink.content + '" class="card-link" title="See the full course description: ' + cejsrDict.articleTitle.content + '">Read More</a></span></p>' :
        //                         '<span class="card-text shortSummary visually-hidden hidden">No valid summary provided</span>';

 
 
 
         /***
          *  check for subject Description
          * 
          * */
        //  let subjectString = (cejsrDict.subjectDescription.content) ?
        //      '<span class="card-text subject"><em>' + cejsrDict.subjectDescription.content + '</em></span>' :
        //      '<span class="card-text subject visually-hidden hidden">No valid subject provided</span>';
 
 
 
 
         /***
          *  check for subject college
          * 
          * */
         let collegeString = (cejsrDict.college.content) ?
             '<span class="card-text college">' + cejsrDict.college.content + '</span>' :
             '<span class="card-text college visually-hidden hidden">No valid subject provided</span>';
 
 
 
 

 
 
 
 
         /***
          *  define subtitle
          * 
          * */
        //  let subtitleString = (cejsrDict.subjectDescription.content && cejsrDict.college.content && cejsrDict.academicLevel.content) ?
        //      '<p class="card-subtitle">' + subjectString + ' | ' + collegeString + ' | ' + academicLevelString + '</p>' :
        //      (cejsrDict.subjectDescription.content && cejsrDict.college.content && !cejsrDict.academicLevel.content) ?
        //      '<p class="card-subtitle">' + subjectString + ' | ' + collegeString + '</p>' :
        //      (cejsrDict.subjectDescription.content && !cejsrDict.college.content && cejsrDict.academicLevel.content) ?
        //      '<p class="card-subtitle">' + subjectString + ' | ' + academicLevelString + '</p>' :
        //      (!cejsrDict.subjectDescription.content && cejsrDict.college.content && cejsrDict.academicLevel.content) ?
        //      '<p class="card-subtitle">' + collegeString + ' | ' + academicLevelString + '</p>' :
        //      (!cejsrDict.subjectDescription.content && !cejsrDict.college.content && cejsrDict.academicLevel.content) ?
        //      '<p class="card-subtitle">' + academicLevelString + '</p>' :
        //      (!cejsrDict.subjectDescription.content && cejsrDict.college.content && !cejsrDict.academicLevel.content) ?
        //      '<p class="card-subtitle">' + collegeString + '</p>' :
        //      (cejsrDict.subjectDescription.content && !cejsrDict.college.content && !cejsrDict.academicLevel.content) ?
        //      '<p class="card-subtitle">' + subjectString + '</p>' :
        //      '<span class="card-subtitle visually-hidden hidden">No valid subtitle provided</span>';
 
 
 
 
         /***
          *  Parse and format sdg icons
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
          *  write document once
          * 
          * */
         writeDocument(
             [
                 beginningHTML,
                 openCardHeader,
                 titleLink,
                //  subtitleString,
                 closeCardHeader,
                 openBodyWrapper,
                 summaryString,
                 listOfLsapIcons,
                 listOfIcons,
                 closeBodyWrapper,
                 endingHTML
             ]
         );
 
 
 
 
     } catch (err) {
         document.write(err.message);
     }
