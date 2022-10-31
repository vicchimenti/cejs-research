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
     *     @version 9.0
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
         let cejscDict = {
 
             contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
             sectionId: getContentValues('<t4 type="content" name="Section ID" output="normal" modifiers="striptags,htmlentities" />'),
             articleTitle: getContentValues('<t4 type="content" name="Article Title" output="normal" modifiers="striptags,htmlentities" />'),
             courseName: getContentValues('<t4 type="content" name="Course Name" output="normal" modifiers="striptags,htmlentities" />'),
             college: getContentValues('<t4 type="content" name="College" output="normal" modifiers="striptags,htmlentities" />'),
             academicLevel: getContentValues('<t4 type="content" name="Section Academic Level" output="normal" modifiers="striptags,htmlentities" />'),
             primarySectionName: getContentValues('<t4 type="content" name="Primary Section Name" output="normal" modifiers="striptags,htmlentities" />'),
             subjectDescription: getContentValues('<t4 type="content" name="Subject" output="normal" modifiers="striptags,htmlentities" />'),
             icons: getContentValues('<t4 type="content" name="Icon ID" output="normal" modifiers="striptags,htmlentities" />'),
             lsapIcons: getContentValues('<t4 type="content" name="LSAP ID" output="normal" modifiers="striptags,htmlentities" />'),             
             summaryDescription: getContentValues('<t4 type="content" name="Plaintext Description" output="normal" modifiers="striptags,htmlentities" />'),
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
         let beginningHTML =    (cejscDict.articleTitle.content) ?
                                '<article class="cejscourseWrapper card shadow border-0 radius-0 mb-3" id="cejscourse' + cejscDict.contentId.content + 'zonea" role="contentinfo" aria-label="' + cejscDict.articleTitle.content + '">' :
                                (cejscDict.primarySectionName.content) ?
                                '<article class="cejscourseWrapper card shadow border-0 radius-0 mb-3" id="cejscourse' + cejscDict.contentId.content + 'zonea" role="contentinfo" aria-label="' + cejscDict.primarySectionName.content + '">' :
                                '<article class="cejscourseWrapper card shadow border-0 radius-0 mb-3" id="cejscourse' + cejscDict.contentId.content + 'zonea" role="contentinfo" aria-label="' + cejscDict.contentName.content + '">';




        /***
          *  include section id
          * 
          * */
         let sectionIdString =  (cejscDict.sectionId.content) ?
                                '<span class="sectionId hidden visually-hidden">' + cejscDict.sectionId.content + '</span>' :
                                '<span class="sectionId hidden visually-hidden">No valid Section ID provided</span>';
 
  

         /***
          *  check for fulltext content
          * 
          * */
         let titleLink = (cejscDict.articleTitle.content && cejscDict.courseName.content) ?
             '<h3 class="card-title border-0"><a href="' + cejscDict.fullTextLink.content + '" class="card-link" title="See the full course details: ' + cejscDict.articleTitle.content + '">' + cejscDict.courseName.content + ' : ' + cejscDict.articleTitle.content + '</a></h3>' :
             (cejscDict.articleTitle.content && !cejscDict.courseName.content) ?
             '<h3 class="card-title border-0"><a href="' + cejscDict.fullTextLink.content + '" class="card-link" title="See the full course details: ' + cejscDict.articleTitle.content + '">' + cejscDict.articleTitle.content + '</a></h3>' :
             '<h3 class="card-title border-0">' + cejscDict.contentName.content + '</h3>';
 
 
 

         /***
          *  check for summaryDescription
          *  find string length and truncate
          * 
          * */
         let maxLength = 200;
         let plainString = (cejscDict.summaryDescription.content) ? '' + cejscDict.summaryDescription.content +  '' : null;
         let actualLength = (plainString) ? plainString.length : null;
         let summarySubstring = (plainString && actualLength && actualLength > maxLength) ?
                                plainString.substring(0, maxLength) :
                                (plainString && actualLength && actualLength <= maxLength) ?
                                plainString.substring(0, actualLength) :
                                null;
                                
                                


        /***
          *  format summary
          * 
          * */
         let summaryString =    (summarySubstring && cejscDict.articleTitle.content) ?
                                '<p class="card-text shortSummary">' + summarySubstring + '... <span class="readMore"><a href="' + cejscDict.fullTextLink.content + '" class="card-link" title="See the full course description: ' + cejscDict.articleTitle.content + '">Read More</a></span></p>' :
                                '<span class="card-text shortSummary visually-hidden hidden">No valid summary provided</span>';

 
 
 
         /***
          *  check for subject Description
          * 
          * */
         let subjectString = (cejscDict.subjectDescription.content) ?
             '<span class="card-text subject"><em>' + cejscDict.subjectDescription.content + '</em></span>' :
             '<span class="card-text subject visually-hidden hidden">No valid subject provided</span>';
 
 
 
 
         /***
          *  check for subject college
          * 
          * */
         let collegeString = (cejscDict.college.content) ?
             '<span class="card-text college">' + cejscDict.college.content + '</span>' :
             '<span class="card-text college visually-hidden hidden">No valid subject provided</span>';
 
 
 
 
         /***
          *  check for subject level
          * 
          * */
         let academicLevelString = (cejscDict.academicLevel.content) ?
             '<span class="card-text academicLevel">' + cejscDict.academicLevel.content + '</span>' :
             '<span class="card-text academicLevel visually-hidden hidden">No valid subject provided</span>';
 
 
 
 
         /***
          *  define subtitle
          * 
          * */
         let subtitleString = (cejscDict.subjectDescription.content && cejscDict.college.content && cejscDict.academicLevel.content) ?
             '<p class="card-subtitle">' + subjectString + ' | ' + collegeString + ' | ' + academicLevelString + '</p>' :
             (cejscDict.subjectDescription.content && cejscDict.college.content && !cejscDict.academicLevel.content) ?
             '<p class="card-subtitle">' + subjectString + ' | ' + collegeString + '</p>' :
             (cejscDict.subjectDescription.content && !cejscDict.college.content && cejscDict.academicLevel.content) ?
             '<p class="card-subtitle">' + subjectString + ' | ' + academicLevelString + '</p>' :
             (!cejscDict.subjectDescription.content && cejscDict.college.content && cejscDict.academicLevel.content) ?
             '<p class="card-subtitle">' + collegeString + ' | ' + academicLevelString + '</p>' :
             (!cejscDict.subjectDescription.content && !cejscDict.college.content && cejscDict.academicLevel.content) ?
             '<p class="card-subtitle">' + academicLevelString + '</p>' :
             (!cejscDict.subjectDescription.content && cejscDict.college.content && !cejscDict.academicLevel.content) ?
             '<p class="card-subtitle">' + collegeString + '</p>' :
             (cejscDict.subjectDescription.content && !cejscDict.college.content && !cejscDict.academicLevel.content) ?
             '<p class="card-subtitle">' + subjectString + '</p>' :
             '<span class="card-subtitle visually-hidden hidden">No valid subtitle provided</span>';
 
 
 
 
         /***
          *  Parse and format sdg icons
          * 
          * */
         if (cejscDict.icons.content) {
 
             let iconArray = cejscDict.icons.content.split(',');
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
        if (cejscDict.lsapIcons.content) {

            let iconArray = cejscDict.lsapIcons.content.split(',');
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
                 subtitleString,
                 closeCardHeader,
                 openBodyWrapper,
                 summaryString,
                 listOfLsapIcons,
                 listOfIcons,
                 sectionIdString,
                 closeBodyWrapper,
                 endingHTML
             ]
         );
 
 
 
 
     } catch (err) {
         document.write(err.message);
     }
