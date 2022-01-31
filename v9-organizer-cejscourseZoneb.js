  /***
   *     @author Victor Chimenti, MSCS
   *     @file v9-organizer-announcementZoneb.js
   *     v9/organizer/announcementZoneb
   *     id:5580
   *
   *     This content type will work in conjunction with the Organizer and each item
   *     will contain one announcement summary in zoneB.
   *
   *     Document will write once when the page loads
   *
   *     @version 7.21
   */




  /***
   *      Import T4 Utilities
   */
  importClass(com.terminalfour.spring.ApplicationContextProvider);
  importClass(com.terminalfour.publish.utils.BrokerUtils);



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
   *      Write the document
   */
  function writeDocument(array) {
      for (var i = 0; i < array.length; i++) {
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
          articleTitle: getContentValues('<t4 type="content" name="Article Title" output="normal" display_field="value" />'),
          articleSummary: getContentValues('<t4 type="content" name="Summary" output="normal" modifiers="striptags,htmlentities" />'),
          publishDate: getContentValues('<t4 type="content" name="Publish Date" output="normal" date_format="MMMM d, yyyy HH:mm:ss z" />'),
          articleFullBody: getContentValues('<t4 type="content" name="Article Body" output="normal" display_field="value" />'),
          audience: getContentValues('<t4 type="content" name="Audience" output="normal" display_field="value" />'),
          topics: getContentValues('<t4 type="content" name="Topic" output="normal" display_field="value" />'),
          priority: getContentValues('<t4 type="content" name="Priority" output="normal" display_field="value" />'),
          sectionLink: getContentValues('<t4 type="content" name="Section Link" output="linkurl" modifiers="nav_sections" />'),
          sectionLinkText: getContentValues('<t4 type="content" name="Section Link 1" output="linktext" modifiers="nav_sections" />'),
          lastModified: getContentValues('<t4 type="meta" meta="last_modified" format="MM/dd/yyyy HH:mm:ss z" />'),
          fullTextLink: getContentValues('<t4 type="content" name="Name" output="fulltext" use-element="true" filename-element="Article Title" modifiers="striptags,htmlentities" />'),
          contentID: getContentValues('<t4 type="meta" meta="content_id" />')
      };




      /***
       *  default html initializations
       * 
       * */
      var lastModifiedString = '<p class="card-text lastModified"><em class="text-muted">Updated: ' + contentDict.lastModified.content + '</em></p>';
      var titleLink = '<h4 class="card-title border-0">' + contentDict.articleTitle.content + '</h4>';
      var summaryString = '<p class="summary card-text">' + contentDict.articleSummary.content + '</p>';
      var beginningHTML = '<article class="suTodayWrapper announcementZoneb card border-0" id="sutoday' + contentDict.contentID.content + 'zoneb" aria-label="Recent Updates: ' + contentDict.articleTitle.content + '">';
      var endingHTML = '<hr class="articleBorderBottom"></article>';
      var openRow = '<div class="row summaryWrapper">';
      var closeRow = '</div>';
      var openBodyWrapper = '<div class="articleSummary col-12 card-body border-0">';
      var closeBodyWrapper = '</div>';
      var linkString = '<span class="externalLink hidden">No Proper Link Provided</span>';
      var openSortFields = '<div class="sortFields hidden visually-hidden">';
      var closeSortFields = '</div>';
      let publishedDateline = '<span class="publishedDate visually-hidden">Published: ' + contentDict.publishDate.content + '</span>';





      /***
       *  check for fulltext content
       * 
       * */
      if (contentDict.articleFullBody.content) {
          titleLink = '<h4 class="card-title border-0"><a href="' + contentDict.fullTextLink.content + '" class="card-link" title="Read the full post: ' + contentDict.articleTitle.content + '">' + contentDict.articleTitle.content + '</a></h4>';
      }




      /***
       *  Parse for external link
       * 
       * */
      if (contentDict.sectionLink.content) {
          linkString = '<span class="externalLink"><a href="' + contentDict.sectionLink.content + '" class="card-link" title="For more information visit: ' + contentDict.sectionLinkText.content + '" target="_blank"><em>' + contentDict.sectionLinkText.content + '</em></a></span>';
      }




      /***
       *  write document once
       * 
       * */
      writeDocument(
          [
              beginningHTML,
              titleLink,
              openRow,
              openBodyWrapper,
              linkString,
              lastModifiedString,
              openSortFields,
              publishedDateline,
              closeSortFields,
              closeBodyWrapper,
              closeRow,
              endingHTML
          ]
      );




  } catch (err) {
      document.write(err.message);
  }