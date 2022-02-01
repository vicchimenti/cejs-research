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
     *     @version 7.6
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
             let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
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
         articleTitle: getContentValues('<t4 type="content" name="Article Title" output="normal" modifiers="striptags,htmlentities" />'),
         articleImage: getContentValues('<t4 type="content" name="Image" output="normal" formatter="path/*" />'),
         iconId: getContentValues('<t4 type="content" name="Icon ID" output="normal" modifiers="striptags,htmlentities" />'),
         courseDescription: getContentValues('<t4 type="content" name="Description" output="normal" modifiers="medialibrary,nav_sections,htmlentities" />'),
         fullTextLink: getContentValues('<t4 type="content" name="Article Title" output="fulltext" use-element="true" filename-element="Article Title" modifiers="striptags,htmlentities" />'),
         contentId: getContentValues('<t4 type="meta" meta="content_id" />')
     };
 
 
 
 
 
 
 
 
     /***
      *  default html initializations
      * 
      * */
     let beginningHTML = '<article class="cejscourseWrapper card shadow border-0 radius-0" id="cejscourse' + cejscDict.contentId.content + 'zonea" aria-label="' + cejscDict.articleTitle.content + '">';
     let endingHTML = '<hr class="articleBorderBottom"></article>';
     let titleLink = '<span class="card-title border-0 visually-hidden">No Valid Title Found</span>';
     let bodyString = '<span class="fullTextBody visually-hidden">No Main Body Content Provided</span>';
     let openRow = '<div class="row summaryWrapper">';
     let closeRow = '</div>';
     let openBodyWrapper = '<div class="articleSummary col-12 card-body border-0">';
     let closeBodyWrapper = '</div>';
     let imageString = '<span class="imageString hidden visually-hidden" />No Image Provided</span>';
     let openImageWrapper = '<figure class="figure hidden visually-hidden">';
     let closeImageWrapper = '</figure>';
     let openSortFields = '<div class="sortFields hidden visually-hidden">';
     let closeSortFields = '</div>';
     let topicList = '<div class="newsroomArticle tags topics hidden visually-hidden"><ul class="categories"><li class="tag">No Topic Provided</li></ul></div>';
     let audienceList = '<div class="newsroomArticle tags audience hidden visually-hidden"><ul class="categories"><li class="tag">No Topic Provided</li></ul></div>';
     let openPublishDetails = '<div class="publishDetails">';
     let closePublishDetails = '</div>';
 
 
 
 
 
 
 
 
     /***
      *  check for fulltext content
      * 
      * */
     if (cejscDict.courseDescription.content) {
 
         titleLink = '<h3 class="card-title border-0"><a href="' + cejscDict.fullTextLink.content + '" class="card-link" title="See the full course details: ' + cejscDict.articleTitle.content + '">' + cejscDict.articleTitle.content + '</a></h3>';
 
     } else {
 
         titleLink = '<h3 class="card-title border-0">' + cejscDict.articleTitle.content + '</h3>';
     }
 
 
 
 
     /***
      *  Parse for image
      * 
      * */
     if (cejscDict.articleImage.content) {
 
         let imageID = content.get('Image').getID();
         let mediaInfo = getMediaInfo(imageID);
         let media = readMedia(imageID);
         let info = new ImageInfo;
         info.setInput(media);
 
         imageString =   (info.check())
                         ? '<img src="' + cejscDict.articleImage.content + '" class="articleImage figure-img card-img-top" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />'
                         : '<img src="' + cejscDict.articleImage.content + '" class="articleImage figure-img card-img-top" alt="' + cejscDict.articleTitle.content + '" loading="auto" />';
   
         openImageWrapper = '<figure class="figure">';
     } 
 
 
 
  
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
             titleLink,
             endingHTML
         ]
     );
 
 
 
 
 } catch (err) {
     document.write(err.message);
 }