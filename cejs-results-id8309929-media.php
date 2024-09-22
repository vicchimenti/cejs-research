<span id="starthere"></span>
<div id="search-results" class="page page--full-width" data-t4-ajax-group="courseSearch" role="main">
    <article class="listing-page">
        <section class="su-listing">
            <?php if (!empty($results)) : ?>
                <?php foreach ($results as $item) : ?>
                    <article class="listing--item news--item global-padding--5x cejs--item">
                        <div class="grid-container">
                            <div class="grid-x grid-margin-x">
                                <div class="cell medium-12">
                                    <div class="news--item__text text-margin-reset">
                                        <h3 class="h4 funderline"><a href="<?php echo $item['url'] ?>"><?php echo $item['cejsName'] ?></a></h3>
                                        <?php if ($item['subtitleString']): ?>
                                            <p><em><?php echo $item['subtitleString'] ?></em></p>
                                        <?php endif ?>
                                        <div class="description global-spacing--2x">
                                            <?php if ($item['cejsType'] == 'research') : // if CEJS Research Articles ?>
                                                <?php echo $item['fullNameString'] ?>
                                                <?php echo $item['typeString'] ?>
                                                <?php echo $item['descriptionString'] ?>
                                                <?php echo $item['citationString'] ?>
                                                <?php echo $item['linkString'] ?>
                                            <?php else: // else CEJS Courses ?>
                                                <?php
                                                    $cleanDesc = strip_tags($item['description']);
                                                    if (mb_strlen($cleanDesc) > 500) {
                                                        $shortDescription = mb_substr($cleanDesc, 0, 500) . '...';
                                                    } else {
                                                        $shortDescription = $cleanDesc;
                                                    }
                                                    echo '<p>' . $shortDescription . '</p>';
                                                ?> 
                                                <p><a href="<?php echo $item['url'] ?>">Read more<span class="sr-only"> about <?php echo $item['cejsName'] ?></span></a></p>
                                            <?php endif ?>
                                        </div>
                                        <div class="global-spacing--4x">
                                            <?php if ($item['lsapIconsString']): ?>
                                                <?php echo $item['lsapIconsString'] ?>
                                            <?php endif ?>
                                            <?php if ($item['iconsString']): ?>
                                                <?php echo $item['iconsString'] ?>
                                            <?php endif ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                <?php endforeach; ?>
                <?php if (isset($paginationArray)) : ?>
                    <div class="pagination-box">
                        <div class="pagination-pages">
                            <nav aria-label="pagination" class="pagination" data-t4-ajax-link="normal" data-t4-scroll="true">
                                <?php foreach ($paginationArray as $paginationItem) : ?>
                                    <?php if ($paginationItem['current']) : ?>
                                        <span class="currentpage"><a href=""><?php echo $paginationItem['text']; ?></a></span>
                                    <?php else : ?>
                                        <a href="<?php echo $paginationItem['href']; ?>" class="<?php echo $paginationItem['class']; ?>">
                                        <?php echo $paginationItem['text']; ?>
                                        </a>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </nav>
                        </div>
                    </div>
                <?php endif; ?>
            <?php else : ?>
                <p style="text-align: center; padding: 30px; font-weight: bold;">No Results Found</p>
            <?php endif; ?>
        </section>
    </article>
</div>


