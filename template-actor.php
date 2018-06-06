<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 * 
 * Template name: Actor
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage
 * @since 1.0
 * @version 1.0
 */

// Aggiunta delle dipendenze js e css solo per le pagine con questo template
function my_custom_theme_enqueue_scripts() {

    wp_enqueue_script(
        "tmdb-script",
        get_stylesheet_directory_uri() . '/js/tmdb-movies.js',
        Array( 'jquery' ),
        wp_get_theme()->get('Version')
    );

    wp_enqueue_style(
        "tmdb-actor-style",
        get_stylesheet_directory_uri() . '/css/tmdb-actor.css',
        Array( 'tmdb-style' ),
        wp_get_theme()->get('Version')
    );
}

add_action(
    'wp_enqueue_scripts',
    'my_custom_theme_enqueue_scripts'
);

get_header(); ?>

<div class="wrap">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php
			while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/page/content', 'actor' );

				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;

			endwhile; // End of the loop.
			?>

		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->

<?php get_footer();
