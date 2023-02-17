{ /* < script type = "text/javascript" > */ }



/***
 *   @author Victor Chimenti, MSCS
 *   @file filter.js
 *
 *   jQuery
 *   This script fliter/searches the CEJS Course content items for matches
 *
 *   @version 4.3.3
 */



/***
 * Populate Dropdown Menu Select Option
 * Currently using the Faculty Full Name class
 * 
 */
const listItemsNode = document.querySelectorAll('p.fullName');
let select = document.getElementById("SelectBox-ByFaculty");
let listItemsArr = []
for (const item of listItemsNode) {

    listItemsArr.push(item.textContent);

}

const listSet = new Set(listItemsArr);
let optionArr = Array.from(listSet);
optionArr.sort();
for (let i = 0; i < optionArr.length; i++) {

    let encodedStr = optionArr[i].replace(/&/g, "&");
    let el = document.createElement("option");
    el.textContent = encodedStr;
    el.value = encodedStr;
    select.appendChild(el);
}






$(function() {

    $(window).load(function() {
        setTimeout(function() {

            let visibleItems = [];
            let parseItems = {};




            function countCourses() {

                let countedCourses = document.querySelectorAll('article.cejsResearchWrapper:not( .hideByText, .hideBySchool, .hideByFaculty, .hideByGoal, .hideByLsap)');
                let activeCourses = Array.from(countedCourses);

                document.getElementById('course-count').textContent = activeCourses.length;
            }
            countCourses();


            //   ***   Process and Parse Visible Items   ***   //
            $(function() {
                let parseItemsToDisplay = function() {
                    visibleItems = $('.cejsResearchWrapper').not('.hideByText, .hideBySchool, .hideByFaculty, .hideByGoal, .hideByLsap');

                    if (visibleItems.length == 0) {
                        $('.noResultsToShow').removeClass('hideResultsMessage');
                    } else {
                        $('.noResultsToShow').addClass('hideResultsMessage');
                    }
                };

                parseItems.process = parseItemsToDisplay;

            });




            //   ***   Keyword Search   ***   //
            $(function() {
                $('#keystroke_filter').on('keyup', function() {
                    let keyword = $(this).val().toLowerCase();

                    $(function() {
                        $('.cejsResearchWrapper').filter(function() {
                            $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                        });
                    });

                    parseItems.process();
                    countCourses();
                });
            });





            //   ***   School Filter   ***   //
            $(function() {
                $('#SelectBox-BySchool').change(function() {

                    let typeKey = $(this).val();
                    if (typeKey) {

                        $('.college').filter(function(i, e) {
                            var typeValue = $(this).text();
                            if (typeValue.match(typeKey)) {
                                $(this).parents('.cejsResearchWrapper').removeClass('hideBySchool');
                            } else {
                                $(this).parents('.cejsResearchWrapper').addClass('hideBySchool');
                            }
                        });

                    } else {

                        $('.cejsResearchWrapper').removeClass('hideBySchool');
                    }

                    parseItems.process();
                    countCourses();
                });
            });




            //   ***   Faculty Filter   ***   //
            $(function() {
                $('#SelectBox-ByFaculty').change(function() {

                    let typeKey = $(this).val();
                    if (typeKey) {

                        $('p.fullName').filter(function(i, e) {
                            var typeValue = $(this).text();
                            if (typeValue.match(typeKey)) {
                                $(this).parents('.cejsResearchWrapper').removeClass('hideByFaculty');
                            } else {
                                $(this).parents('.cejsResearchWrapper').addClass('hideByFaculty');
                            }
                        });

                    } else {

                        $('.cejsResearchWrapper').removeClass('hideByFaculty');
                    }

                    parseItems.process();
                    countCourses();
                });
            });




            //   ***  SDG Goals Multi-Select Checkbox Filter    ***   //
            $(function() {
                $('#SelectBox-ByGoal').change(function() {

                    let elementKeys = [];
                    elementKeys[0] = 'Any';

                    $('input[name=SelectBox-ByGoal]:checked').each(function(item) {
                        elementKeys[item] = $(this).val();
                    });

                    if (elementKeys[0] != "Any") {
                        $('ul.iconDashboard').filter(function(i, e) {

                            let elementValue = $(this).text() || null;
                            let sdgWheel = "UN Sustainable Development Goals";
                            $(this).parents('.cejsResearchWrapper').addClass('hideByGoal');

                            if (elementValue) {
                                for (let index = 0; index < elementKeys.length; index++) {

                                    if (elementValue.includes(elementKeys[index]) || elementValue.includes(sdgWheel)) {
                                        $(this).parents('.cejsResearchWrapper').removeClass('hideByGoal');
                                    }
                                }
                            }
                        });
                    } else {
                        $('.cejsResearchWrapper').removeClass('hideByGoal');
                    }

                    parseItems.process();
                    countCourses();
                });
            });





            //   ***  LSAP Goals Multi-Select Checkbox Filter    ***   //
            $(function() {
                $('#SelectBox-ByLsap').change(function() {
                    let elementKeys = [];
                    elementKeys[0] = 'Any';
                    $('input[name=SelectBox-ByLsap]:checked').each(function(item) {
                        elementKeys[item] = $(this).val();
                    });

                    if (elementKeys[0] != "Any") {
                        $('ul.lsapIconDashboard').filter(function(i, e) {
                            let elementValue = $(this).text() || null;
                            $(this).parents('.cejsResearchWrapper').addClass('hideByLsap');

                            if (elementValue) {

                                for (let index = 0; index < elementKeys.length; index++) {
                                    if (elementValue.includes(elementKeys[index])) {
                                        $(this).parents('.cejsResearchWrapper').removeClass('hideByLsap');
                                    }
                                }
                            }
                        });
                    } else {
                        $('.cejsResearchWrapper').removeClass('hideByLsap');
                    }

                    parseItems.process();
                    countCourses();
                });
            });




        }, 10);
    });
});




{ /* </script> */ }