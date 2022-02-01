/***
 *     @author Victor Chimenti, MSCS
 *     @file v9-fulltext.js
 *     @see CEJS Course
 *              ID: 5650
 *              v9/fulltext
 *
 *     Document will write client side once when the page loads
 *
 *     @version 7.2
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
         var _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();
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
  *      Main
  */
 try {
 
 
     /***
      *      Dictionary of content
      * */
     var contentDict = {
        contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        articleTitle: getContentValues('<t4 type="content" name="Article Title" output="normal" modifiers="striptags,htmlentities" />'),
        articleImage: getContentValues('<t4 type="content" name="Image" output="normal" formatter="path/*" />'),
        iconId: getContentValues('<t4 type="content" name="Icon ID" output="normal" modifiers="striptags,htmlentities" />'),
        primarySectionName: getContentValues('<t4 type="content" name="Primary Section Name" output="normal" modifiers="striptags,htmlentities" />'),
        subjectDescription: getContentValues('<t4 type="content" name="Subject" output="normal" modifiers="striptags,htmlentities" />'),




        courseDescription: getContentValues('<t4 type="content" name="Description" output="normal" modifiers="medialibrary,nav_sections,htmlentities" />'),
        fullTextLink: getContentValues('<t4 type="content" name="Name" output="fulltext" use-element="true" filename-element="Article Title" modifiers="striptags,htmlentities" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />'),
        anchorTag: getContentValues('<t4 type="meta" meta="html_anchor" />')
     };
 
 
 
 
     /***
      *  default html initializations
      * 
      * */
      let beginningHTML = '<article class="cejscourseWrapper card shadow border-0 radius-0" id="cejscourse' + cejscDict.contentId.content + 'zonea" aria-label="' + cejscDict.articleTitle.content + '">';
      let endingHTML = '</article>';
      let openImageWrapper = '<div class="imageWrapper col-12 d-none visually-hidden hidden">';
      let closeImageWrapper = '</div>';
      let openRow = '<div class="row g-0 noGap">';
      let closeRow = '</div>';
      let openBodyWrapper = '<div class="articleSummary col-12 card-body">';
      let closeBodyWrapper = '</div>';
      let imageString = '<span class="imageString hidden visually-hidden" />No Image Provided</span>';
      let openFig = '<figure class="figure hidden visually-hidden">';
      let closeFig = '</figure>';
 
 
 
 
 
 
     /***
      *  check for fulltext content
      * 
      * */
      let titleLink =   (cejscDict.courseDescription.content)
                        ? '<h3 class="card-title border-0"><a href="' + cejscDict.fullTextLink.content + '" class="card-link" title="See the full course details: ' + cejscDict.articleTitle.content + '">' + cejscDict.articleTitle.content + '</a></h3>'
                        : '<h3 class="card-title border-0">' + cejscDict.articleTitle.content + '</h3>';




    /***
      *  check for subject Description
      * 
      * */
      let subjecString =    (cejscDict.subjectDescription.content)
                            ? '<p class="card-subtitle primarySectionName"><strong>Subject: </strong><em>' + cejscDict.subjectDescription.content + '</em></p>'
                            : '<p class="card-text primarySectionName visually-hidden hidden">No valid primary section name provided</p>';




    /***
      *  check for primary section name
      * 
      * */
      let primaryNameString =   (cejscDict.primarySectionName.content)
                                ? '<p class="card-text primarySectionName"><strong>Primary Section Name: </strong>' + cejscDict.primarySectionName.content + '</p>'
                                : '<p class="card-text primarySectionName visually-hidden hidden">No valid primary section name provided</p>';





    /***
      *  check for icon id
      * 
      * */
      let iconString =   (cejscDict.iconId.content)
                        ? '<p class="card-text iconId"><strong>Media Library Image ID: </strong>' + cejscDict.iconId.content + '</p>'
                        : '<p class="card-text iconId visually-hidden hidden">No valid icon provided</p>';
 
 
 
 
 
     /***
      *  Parse for image
      * 
      * */
     if (contentDict.articleImage.content) {
 
         openImageWrapper = '<figure class="figure">';
         var imageID = content.get('Image').getID();
         var mediaInfo = getMediaInfo(imageID);
         var media = readMedia(imageID);
         var info = new ImageInfo;
         info.setInput(media);
 
         imageString =               (info.check())
                                     ? '<img src="' + contentDict.articleImage.content + '" class="articleImage figure-img card-img-top" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />'
                                     : '<img src="' + contentDict.articleImage.content + '" class="articleImage figure-img card-img-top" alt="' + contentDict.articleTitle.content + '" loading="auto" />';
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
      *  write document once
      * 
      * */
     writeDocument(
         [
             beginningHTML,
             contentDict.anchorTag.content,
             titleHeader,
             openImageWrapper,
             imageString,


             closeImageWrapper,
             openRow,
             openBodyWrapper,
             openPublishDetails,


             closePublishDetails,



             openSortFields,

             closeSortFields,
             closeBodyWrapper,

             openFooter,


             closeFooter,
             bodyBorder,
             closeRow,
             endingHTML
         ]);
 
 
 
 
 } catch (err) {
     document.write(err.message);
 }