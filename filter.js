{ /* < script type = "text/javascript" > */ }



/***
*   @author Victor Chimenti, MSCS
*   @file filter.js
*
*   jQuery
*   This script fliter/searches the CEJS Course content items for matches
*
*   @version 3.14.9
*/






$(function () {

    $(window).load(function () {
        setTimeout(function () {

            let visibleItems = [];
            let parseItems = {};


            

            function countCourses() {

                let countedCourses = document.querySelectorAll('article.cejscourseWrapper:not( .hideByText, .hideBySchool, .hideByLevel, .hideByGoal, .hideByLsap)');
                let activeCourses = Array.from(countedCourses);

                document.getElementById('course-count').textContent = activeCourses.length;
            }
            countCourses();


            //   ***   Process and Parse Visible Items   ***   //
            $(function () {
                let parseItemsToDisplay = function () {
                    visibleItems = $('.cejscourseWrapper').not('.hideByText, .hideBySchool, .hideByLevel, .hideByGoal, .hideByLsap');
                    
                    if (visibleItems.length == 0) {
                        $('.noResultsToShow').removeClass('hideResultsMessage');
                    } else {
                        $('.noResultsToShow').addClass('hideResultsMessage');
                    }
                };

                parseItems.process = parseItemsToDisplay;
                
            });




            //   ***   Keyword Search   ***   //
            $(function () {
                $('#keystroke_filter').on('keyup', function () {
                    let keyword = $(this).val().toLowerCase();

                    $(function () {
                        $('.cejscourseWrapper').filter(function () {
                            $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                        });
                    });

                    parseItems.process();
                    countCourses();
                });
            });





            //   ***   School Filter   ***   //
            $(function () {
                $('#SelectBox-BySchool input:radio').change(function () {
                    let typeKey = $(this).val();
                    let viewAll = "All";

                    if (typeKey != viewAll) {
                        $('.college').filter(function (i, e) {
                            var typeValue = $(this).text();

                            if (typeValue.match(typeKey)) {
                                $(this).parents('.cejscourseWrapper').removeClass('hideBySchool');
                            } else {
                                $(this).parents('.cejscourseWrapper').addClass('hideBySchool');
                            }

                        });
                    } else {
                        $('.cejscourseWrapper').removeClass('hideBySchool');
                    }

                    parseItems.process();
                    countCourses();
                });
            });





            //   ***   Course Level Filter   ***   //
            $(function () {
                $('#SelectBox-ByLevel input:radio').change(function () {
                    let typeKey = $(this).val();
                    let viewAll = "All";

                    if (typeKey != viewAll) {
                        $('.academicLevel').filter(function (i, e) {
                            var typeValue = $(this).text();

                            if (typeValue.match(typeKey)) {
                                $(this).parents('.cejscourseWrapper').removeClass('hideByLevel');
                            } else {
                                $(this).parents('.cejscourseWrapper').addClass('hideByLevel');
                            }

                        });
                    } else {
                        $('.cejscourseWrapper').removeClass('hideByLevel');
                    }

                    parseItems.process();
                    countCourses();
                });
            });





            //   ***  SDG Goals Multi-Select Checkbox Filter    ***   //
            $(function () {
                $('#SelectBox-ByGoal').change(function () {
                    
                    let elementKeys = [];
                    elementKeys[0] = 'Any';

                    $('input[name=SelectBox-ByGoal]:checked').each(function (item) {
                        elementKeys[item] = $(this).val();
                    });

                    if (elementKeys[0] != "Any") {
                        $('ul.iconDashboard').filter(function (i, e) {

                            let elementValue = $(this).text() || null;
                            let sdgWheel = "UN Sustainable Development Goals";
                            $(this).parents('.cejscourseWrapper').addClass('hideByGoal');

                            if (elementValue) {
                                for (let index = 0; index < elementKeys.length; index++) {

                                    if (elementValue.includes(elementKeys[index]) || elementValue.includes(sdgWheel)) {
                                        $(this).parents('.cejscourseWrapper').removeClass('hideByGoal');
                                    }
                                }
                            }
                        });
                    } else {
                        $('.cejscourseWrapper').removeClass('hideByGoal');
                    }

                    parseItems.process();
                    countCourses();
                });
            });





            //   ***  LSAP Goals Multi-Select Checkbox Filter    ***   //
            $(function () {
                $('#SelectBox-ByLsap').change(function () {
                    let elementKeys = [];
                    elementKeys[0] = 'Any';
                    $('input[name=SelectBox-ByLsap]:checked').each(function (item) {
                        elementKeys[item] = $(this).val();
                    });

                    if (elementKeys[0] != "Any") {
                        $('ul.lsapIconDashboard').filter(function (i, e) {
                            let elementValue = $(this).text() || null;
                            $(this).parents('.cejscourseWrapper').addClass('hideByLsap');

                            if (elementValue) {

                                for (let index = 0; index < elementKeys.length; index++) {
                                    if (elementValue.includes(elementKeys[index])) {
                                        $(this).parents('.cejscourseWrapper').removeClass('hideByLsap');
                                    }
                                }
                            }
                        });
                    } else {
                        $('.cejscourseWrapper').removeClass('hideByLsap');
                    }

                    parseItems.process();
                    countCourses();
                });
            });
            



        }, 10);
    });
});


{ /* </script> */ }