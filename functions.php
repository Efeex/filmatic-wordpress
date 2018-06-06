<?php

function my_custom_theme_enqueue_styles() {

    $parent_style = 'mesmerize-style';
    $child_style  = 'filmatic-style';

    wp_enqueue_style(
        $parent_style,
        get_template_directory_uri() . '/style.css'
    );

    wp_enqueue_style(
        $child_style,
        get_stylesheet_directory_uri() . '/style.css',
        Array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}

add_action(
    'wp_enqueue_scripts',
    'my_custom_theme_enqueue_styles'
);

?>