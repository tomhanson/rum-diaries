<?php
/**
 * Sage includes
 *
 * The $sage_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/sage/pull/1042
 */
$sage_includes = [
    'lib/assets.php',    // Scripts and stylesheets
    'lib/extras.php',    // Custom functions
    'lib/setup.php',     // Theme setup
    'lib/titles.php',    // Page titles
    'lib/wrapper.php',   // Theme wrapper class
    'lib/customizer.php' // Theme customizer
];

foreach ($sage_includes as $file) {
    if (!$filepath = locate_template($file)) {
        trigger_error(sprintf(__('Error locating %s for inclusion', 'sage'), $file), E_USER_ERROR);
    }

    require_once $filepath;
}
unset($file, $filepath);

function print_categories($cats)
{
    $markup = '';
    $catArr = array();
    foreach ($cats as $cat) {
        array_push($catArr, $cat->name);
    }
    //if there is only one item then it must be printed

    if (sizeof($cats) === 1 && $cats[0]->parent === 0) {
        if (!strtolower($cats[0]->name) === 'roundups') {
            array_push($catArr, $cats[0]->name);
        }
    }

    $markup .= implode(", ", $catArr);
    return $markup;
}

function format_comment($comment, $args, $depth)
{

$GLOBALS['comment'] = $comment;
$comment_id = get_comment_ID();
$comment_author = get_comment_author($comment_id);
?>

<li <?php comment_class(); ?> id="li-comment-<?php echo $comment_id ?>">
    <?php echo get_avatar( $GLOBALS['comment']->user_id, '100', '', 'comment', array( 'class' => array( 'meta--avatar' ) ) ); ?>

    <div class="content article--content">
        <p><?php comment_text(); ?></p>
        <div class="meta"><span class="meta--author"><?php printf(__('%s'), get_comment_author_link()) ?></span>
            <span>wrote on </span>
            <time class="meta--date" datetime=""><?php printf(__('%1$s'), get_comment_date() ) ?></time>
            <button class="btn btn--blue btn--sm btn--raised" style="position: relative; overflow: hidden;">
                <?php comment_reply_link(array_merge($args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
            </button>
        </div>
    </div>
    <?php if ($comment->comment_approved == '0') : ?>
        <em>
            <php _e('Your comment is awaiting moderation.') ?></em><br/>
    <?php endif; ?>

    <?php }



add_filter( 'comment_form_defaults', 't5_move_textarea' );
add_action( 'comment_form_top', 't5_move_textarea' );

function t5_move_textarea( $input = array () )
{
    static $textarea = '';

    if ( 'comment_form_defaults' === current_filter() )
    {
        // Copy the field to our internal variable …
        $textarea = $input['comment_field'];
        // … and remove it from the defaults array.
        $input['comment_field'] = '';
        return $input;
    }

    print apply_filters( 'comment_form_field_comment', $textarea );
}




