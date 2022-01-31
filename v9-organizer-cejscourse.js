    /***
     *     @author Victor Chimenti, MSCS
     *     @file v9-organizer-cejscourse.js
     *     v9/organizer/cejscourse
     *     id:5650
     *
     *     This content type will work in conjunction with the Organizer and each item
     *     will contain one announcement.
     *
     *     Document will write once when the page loads
     *
     *     @version 7.0
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
             var _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
             return {
                 isError: false,
                 content: _tag == '' ? null : _tag
             }
         } catch (error) {
             return {
                 isError: true,
                 message: error.message
             }
         }
     }
     
     
     
     
     /***
      *      Returns a media object
      */
     function getMediaInfo(mediaID) {
     
         var mediaManager = ApplicationContextProvider.getBean(IMediaManager);
         var media = mediaManager.get(mediaID, language);
     
         return media;
     }
     
     
     
     
     /***
      *      Returns a media stream object
      */
     function readMedia(mediaID) {
     
         var mediaObj = getMediaInfo(mediaID);
         var oMediaStream = mediaObj.getMedia();
     
         return oMediaStream;
     }
     
     
     
     
     /***
      *      Returns an array of list items
      */
     function assignList(arrayOfValues) {
     
         let listValues = '';
     
         for (let i = 0; i < arrayOfValues.length; i++) {
     
             listValues += '<li class="tag">' + arrayOfValues[i].trim() + '</li>';
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
     var contentDict = {
         contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
         articleTitle: getContentValues('<t4 type="content" name="Article Title" output="normal" display_field="value" />'),
         articleImage: getContentValues('<t4 type="content" name="Image" output="normal" formatter="path/*" />'),
         iconId: getContentValues('<t4 type="content" name="Icon ID" output="normal" modifiers="striptags,htmlentities" />'),





         courseDescription: getContentValues('<t4 type="content" name="Description" output="normal" modifiers="medialibrary,nav_sections" />'),
         fullTextLink: getContentValues('<t4 type="content" name="Name" output="fulltext" use-element="true" filename-element="Article Title" modifiers="striptags,htmlentities" />'),
         contentId: getContentValues('<t4 type="meta" meta="content_id" />')
     };
 
 
 
 
 
 
 
 
     /***
      *  default html initializations
      * 
      * */
     var beginningHTML = '<article class="cejscourseWrapper card shadow border-0 radius-0" id="cejscourse' + contentDict.contentId.content + 'zonea" aria-label="' + contentDict.articleTitle.content + '">';
     var endingHTML = '<hr class="articleBorderBottom"></article>';
     var titleLink = '<span class="card-title border-0 visually-hidden">No Valid Title Found</span>';
     var bodyString = '<span class="fullTextBody visually-hidden">No Main Body Content Provided</span>';
     var openRow = '<div class="row summaryWrapper">';
     var closeRow = '</div>';
     var openBodyWrapper = '<div class="articleSummary col-12 card-body border-0">';
     var closeBodyWrapper = '</div>';
     var imageString = '<span class="imageString hidden visually-hidden" />No Image Provided</span>';
     var openImageWrapper = '<figure class="figure hidden visually-hidden">';
     var closeImageWrapper = '</figure>';
     var openSortFields = '<div class="sortFields hidden visually-hidden">';
     var closeSortFields = '</div>';
     var topicList = '<div class="newsroomArticle tags topics hidden visually-hidden"><ul class="categories"><li class="tag">No Topic Provided</li></ul></div>';
     var audienceList = '<div class="newsroomArticle tags audience hidden visually-hidden"><ul class="categories"><li class="tag">No Topic Provided</li></ul></div>';
     var openPublishDetails = '<div class="publishDetails">';
     var closePublishDetails = '</div>';
 
 
 
 
 
 
 
 
     /***
      *  check for fulltext content
      * 
      * */
     if (contentDict.articleFullBody.content) {
 
         titleLink = '<h3 class="card-title border-0"><a href="' + contentDict.fullTextLink.content + '" class="card-link" title="Read the full announcement: ' + contentDict.articleTitle.content + '">' + contentDict.articleTitle.content + '</a></h3>';
 
     } else {
 
         titleLink = '<h3 class="card-title border-0">' + contentDict.articleTitle.content + '</h3>';
     }
 
 
 
 
     /***
      *  Parse for image
      * 
      * */
     if (contentDict.articleImage.content) {
 
         var imageID = content.get('Image').getID();
         var mediaInfo = getMediaInfo(imageID);
         var media = readMedia(imageID);
         var info = new ImageInfo;
         info.setInput(media);
 
         imageString =   (info.check())
                         ? '<img src="' + contentDict.articleImage.content + '" class="articleImage figure-img card-img-top" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />'
                         : '<img src="' + contentDict.articleImage.content + '" class="articleImage figure-img card-img-top" alt="' + contentDict.articleTitle.content + '" loading="auto" />';
   
         openImageWrapper = '<figure class="figure">';
     }
 
 
 
 
     /***
      *  parse the list of topics tags, add <li> tags
      * 
      * */
    //  if (contentDict.topics.content) {
 
    //      let arrayOfTags = contentDict.topics.content.split(',');
    //      let listItems = assignList(arrayOfTags);
 
    //      topicList = '<div class="newsroomArticle tags topics"><ul class="categories">' + listItems + '</ul></div><br>';
    //  }
 
 
 
 
     /***
      *  parse the list of audience tags, add <li> tags
      * 
      * */
    //  if (contentDict.audience.content) {
 
    //      let audienceArray = contentDict.audience.content.split(',');
    //      let audienceItems = assignList(audienceArray);
 
    //      audienceList = '<div class="newsroomArticle tags audience"><ul class="categories">' + audienceItems + '</ul></div>';
    //  }
 
 
 
 
     /***
      *  Parse for external link
      * 
      * */
    //  var linkString =    contentDict.sectionLink.content
    //                      ? '<p class="card-text externalLink"><a href="' + contentDict.sectionLink.content + '" class="card-link" title="For more information visit: ' + contentDict.sectionLinkText.content + '" target="_blank"><em>' + contentDict.sectionLinkText.content + '</em></a></p>'
    //                      : '<p class="card-text externalLink hidden visually-hidden">No Proper Link Provided</p>';
 
 
 
 
     /***
      *  Parse for Priority
      *  Currently a hidden sort field
      * 
      * */
    //  var prioityString = contentDict.priority.content
    //                      ? '<span class="priority">' + contentDict.priority.content + '</span>'
    //                      : '<span class="priority hidden visually-hidden">No Priority Entered</span>';
 
 
 
 
 
 
 
 
     /***
      *  write document once
      * 
      * */
     writeDocument(
         [
             beginningHTML,
             openImageWrapper,
             imageString,
             closeImageWrapper,
             openRow,
             openBodyWrapper,
             titleLink,



             closeBodyWrapper,


             openSortFields,

             closeSortFields,


             closeRow,
             endingHTML
         ]
     );
 
 
 
 
 } catch (err) {
     document.write(err.message);
 }