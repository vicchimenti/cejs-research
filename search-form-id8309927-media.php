<?php
$genericFacet = \T4\PHPSearchLibrary\FacetFactory::getInstance('GenericFacet', $documentCollection, $queryHandler);
$filters = $queryHandler->getQueryValuesForPrint();
$categoryFilters = array('school','courseLevel','faculty', 'icons', 'lsapIcons');

// Get details of icons from JSON string and decode JSON string to associative array
// This is used to get the labels and images for the icons
$iconData = json_decode('<t4 type="navigation" name="CEJS Search: Return Icon JSON" id="1054" />', true);
?>
<section class="su-listing">
    <div id="searchoptionsGeneric" role="search" class="su-listing--form-wrapper bg--dark global-padding--8x su-listing--form-wrapper-cejs" data-t4-ajax-group="courseSearch">
        <div class="grid-container">
            <h2 class="h3"><?php echo isset($searchFormTitle) ? $searchFormTitle : 'Search' ?></h2>
        </div>
        <form>
            <div class="cell">
                <label for="keywords">Search</label>
                <input type="text" name="keywords" id="keywords" placeholder="<?php echo isset($searchFormPlaceholder) ? $searchFormPlaceholder : 'Search' ?>&hellip;" value="<?php echo !empty($query['keywords']) ? $query['keywords'] : ''  ?>">
            </div>
            <?php
                $element = 'school';
                $genericFacet->setMember('element', $element);
                $genericFacet->setMember('type', 'List');
                $genericFacet->setMember('facetSource', 'documents');
                $genericFacet->setMember('sortingState', true);
                $genericFacet->setMember('multipleValueState', true);
                $genericFacet->setMember('multipleValueSeparator', ',');
                $search = $genericFacet->displayFacet();
            ?>
            <?php if (!empty($search)) : ?>
                <div class="cell medium-6">
                    <label for="<?php echo $element; ?>" class="label-text">School</label>
                    <select id="<?php echo $element; ?>" name="<?php echo $element; ?>" data-cookie="T4_persona">
                        <option value="">All Schools</option>
                        <?php foreach ($search as $item) : ?>
                            <option value="<?php echo strtolower($item['value']); ?>" <?php echo $item['selected'] ? 'selected' : '' ?>><?php echo $item['label']; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            <?php endif ?>
            <?php
                $element = 'courseLevel';
                $genericFacet->setMember('element', $element);
                $genericFacet->setMember('type', 'List');
                $genericFacet->setMember('facetSource', 'documents');
                $genericFacet->setMember('sortingState', true);
                $genericFacet->setMember('multipleValueState', true);
                $genericFacet->setMember('multipleValueSeparator', ',');
                $search = $genericFacet->displayFacet();
            ?>
            <?php if (!empty($search)) : ?>
                <div class="cell medium-6">
                    <label for="<?php echo $element; ?>" class="label-text">Course Level</label>
                    <select id="<?php echo $element; ?>" name="<?php echo $element; ?>" data-cookie="T4_persona">
                        <option value="">All Course Levels</option>
                        <?php foreach ($search as $item) : ?>
                            <option value="<?php echo strtolower($item['value']); ?>" <?php echo $item['selected'] ? 'selected' : '' ?>><?php echo $item['label']; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            <?php endif ?>
            <?php
                $element = 'faculty';
                $genericFacet->setMember('element', $element);
                $genericFacet->setMember('type', 'List');
                $genericFacet->setMember('facetSource', 'documents');
                $genericFacet->setMember('sortingState', true);
                $genericFacet->setMember('multipleValueState', true);
                $genericFacet->setMember('multipleValueSeparator', '|');
                $search = $genericFacet->displayFacet();
            ?>
            <?php if (!empty($search)) : ?>
                <div class="cell medium-6">
                    <label for="<?php echo $element; ?>" class="label-text">Faculty</label>
                    <select id="<?php echo $element; ?>" name="<?php echo $element; ?>" data-cookie="T4_persona">
                        <option value="">All Faculties</option>
                        <?php foreach ($search as $item) : ?>
                            <option value="<?php echo strtolower($item['value']); ?>" <?php echo $item['selected'] ? 'selected' : '' ?>><?php echo $item['label']; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
            <?php endif ?>
            <?php
                $element = 'lsapIcons';
                $genericFacet->setMember('element', $element);
                $genericFacet->setMember('type', 'List');
                $genericFacet->setMember('facetSource', 'documents');
                $genericFacet->setMember('sortingState', true);
                $genericFacet->setMember('multipleValueState', true);
                $genericFacet->setMember('multipleValueSeparator', ',');
                $search = $genericFacet->displayFacet();
            ?>
            <?php if (!empty($search)) : ?>
                <div class="cell">
                    <fieldset>
                        <legend>Laudato Si' Goal</legend>
                        <div class="fieldset-wrapper">
                            <?php $i = 0; ?>
                            <?php foreach ($search as $item) : ?>
                                <?php if (isset($iconData[$item['value']])) : ?>
                                    <div class="fieldset--checkbox">
                                        <input type="checkbox" id="<?php echo $element . '[' . ++$i . ']' ?>" value="<?php echo strtolower($item['value']) ?>" data-cookie="T4_persona" name="<?php echo $element ?>" <?php echo $item['selected'] ? 'checked' : '' ?> data-t4-value="<?php echo strtolower($item['value']) ?>" >
                                        <label for="<?php echo $element . '[' . $i . ']' ?>">
                                            <img src="<?php echo $iconData[$item['value']]['path'] ?>" alt="<?php echo $iconData[$item['value']]['desc'] ?>" />
                                            <span class="sr-only"><?php echo $iconData[$item['value']]['label'] ?></span>
                                        </label>
                                    </div>
                                <?php endif ?>
                            <?php endforeach; ?>
                        </div>
                    </fieldset>
                </div>
            <?php endif ?>
            <?php
                $element = 'icons';
                $genericFacet->setMember('element', $element);
                $genericFacet->setMember('type', 'List');
                $genericFacet->setMember('facetSource', 'documents');
                $genericFacet->setMember('sortingState', true);
                $genericFacet->setMember('multipleValueState', true);
                $genericFacet->setMember('multipleValueSeparator', ',');
                $search = $genericFacet->displayFacet();
            ?>
            <?php if (!empty($search)) : ?>
                <div class="cell sdg">
                    <fieldset>
                        <legend>Sustainable Development Goal</legend>
                        <div class="fieldset-wrapper">
                            <?php $i = 0; ?>
                            <?php foreach ($search as $item) : ?>
                                <?php if (isset($iconData[$item['value']])) : ?>
                                    <div class="fieldset--checkbox">
                                        <input type="checkbox" id="<?php echo $element . '[' . ++$i . ']' ?>" value="<?php echo strtolower($item['value']) ?>" data-cookie="T4_persona" name="<?php echo $element ?>" <?php echo $item['selected'] ? 'checked' : '' ?> data-t4-value="<?php echo strtolower($item['value']) ?>" >
                                        <label for="<?php echo $element . '[' . $i . ']' ?>">
                                            <img src="<?php echo $iconData[$item['value']]['path'] ?>" alt="<?php echo $iconData[$item['value']]['desc'] ?>" />
                                            <span class="sr-only"><?php echo $iconData[$item['value']]['label'] ?></span>
                                        </label>
                                    </div>
                                <?php endif ?>
                            <?php endforeach; ?>
                        </div>
                    </fieldset>
                </div>
            <?php endif ?>

            <div class="cell initial-12">
                <input type="submit" value="Submit" class="button">
            </div>
        </form>
    </div>
    <div class="filter-feedback">
        <div class="grid-container">
            <span id="starthere"></span>          
            <div id="searchoptions-filters" class="active-filters" role="search" data-t4-ajax-group="courseSearch" aria-label="Deselect Filters">
                <div id="event-filters" class="active-filters--list" >
                    <span>Active filters:</span>
                    <?php  $i = 0; if ($filters !== null) : ?>
                        <?php
                        $tagsHTML = '';
                        foreach ($categoryFilters as $key) {
                            if (isset($filters[$key]) && is_array($filters[$key])) :
                                foreach ($filters[$key] as $value) : 
                                    $tagsHTML .= '<li class="filter-' . $i++ . ' small primary" role="button" tabindex="0" data-t4-value="' . strtolower($value) . '" data-t4-filter="' . $key . '">' . (isset($iconData[$value]) ? $iconData[$value]['label'] : $value) . '<span class="remove"><i class="fa fa-times"></i></span></li>'; 
                                endforeach;
                            elseif (isset($filters[$key])) :
                                $value = $filters[$key];
                                $tagsHTML .= '<li class="filter-' . $i++ . ' small primary" role="button" tabindex="0" data-t4-value="' . strtolower($value) . '" data-t4-filter="' . $key . '">' . (isset($iconData[$value]) ? $iconData[$value]['label'] : $value) . '<span class="remove"><i class="fa fa-times"></i></span></li>'; 
                            endif;
                        }
                        if (isset($filters['keywords'])) :
                            $tagsHTML .= '<li class="filter-' . $i++ . ' small primary" role="button" tabindex="0" data-t4-filter="keywords">' . $filters['keywords'] . '<span class="remove"><i class="fa fa-times"></i></span></li>'; 
                        endif; 
                        echo $tagsHTML != '' ? '<ul class="no-bullet">' . $tagsHTML . '</ul>' : '';
                        ?>
                    <?php endif; ?>
                </div>
              <?php if ($i > 0) : ?>
              <div class="funderline">
                <a href="index.php" role="button" data-t4-ajax-link="true">
                  Clear Filters
                  <span class="fa fa-times"></span>
                </a>
              </div>
              <?php endif; ?>    
              <div class="search-count"><p>Showing <strong><?php echo count($results) ?> articles</strong> of <?php echo $totalResults; ?></p></div>
            </div>          
        </div>
    </div>
</section>
