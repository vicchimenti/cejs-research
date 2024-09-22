<?php

try {
    /* Version 2.1.1 */
    $currentPosition    	= 'v10/text/html';
    $requiredPosition   	= '<t4 type="content" name="Position in the page" output="normal" display_field="value" />';
    $configUrl          	= '<t4 type="content" name="PHP Program Search Config Link" output="linkurl" modifiers="nav_sections" />';
  	$searchFormTitle		= '<t4 type="content" name="Search Form Title" output="normal" modifiers="striptags,htmlentities" />';
    $searchFormPlaceholder  = '<t4 type="content" name="Search Form Placeholder" output="normal" modifiers="striptags,htmlentities" />';
   
    if (!isset($configUrl) || $configUrl == '') {
        $configUrl   = __DIR__;
    } else {
        $configUrl   = $_SERVER['DOCUMENT_ROOT']  . $configUrl;
    }

    @include_once($configUrl . '/config.php');
    if (preg_match("/t4_([0-9]{16,20}+)\.php/Ui", $_SERVER['REQUEST_URI'], $output_array)) {
        throw new Exception("Sorry, Search is not available in preview.");
    }

    if (isset($errorAC) && $errorAC != []) {
        throw new Exception(implode('<br />', $errorAC), 1);
    }

    if (!isset($documentCollection)) {
        throw new Exception("Sorry, There are issue in the configuration.", 1);
    }

    if ($requiredPosition == '') {
        throw new Exception("Please select a Position in the page", 1);
    }

    if ($currentPosition  == $requiredPosition) {
        $mainLibraryUrl = str_replace(rtrim($_SERVER['DOCUMENT_ROOT'], '/'), '', realpath($configUrl)); ?>
        
        <t4 type="content" name="View" output="normal" formatter="inline/*" />
        
        
        <?php
    }
} catch (\UnderflowException $e) {
    T4\PHPSearchLibrary\ExceptionFormatter::FormatException($e);
} catch (\RuntimeException $e) {
    T4\PHPSearchLibrary\ExceptionFormatter::FormatException($e);
} catch (\InvalidArgumentException $e) {
    T4\PHPSearchLibrary\ExceptionFormatter::FormatException($e);
} catch (\LengthException $e) {
    T4\PHPSearchLibrary\ExceptionFormatter::FormatException($e);
} catch (\Exception $e) {
    if (!isset($displayedErrorCourse)) {
        echo '<div class="eventCalError" style="background:rgb(250,200,200); padding: 1em; border: 1px solid rgb(180,20,20); border-radius: 3px; margin-bottom: 1em;color: rgb(130,20,20)">'.$e->getMessage().'</div>';
        $displayedErrorCourse = true;
    }
}
?>
