<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage 
 * @since 1.0
 * @version 1.0
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="post-content">
		<?php the_title( '<h1 class="post-title">', '</h1>' ); ?>
		<?php // twentyseventeen_edit_link( get_the_ID() ); ?>
	</header><!-- .entry-header -->
	<div class="post-excerpt">
		<?php
            the_content();
        ?>
        
        <h2>Gli ultimi film di <?php the_title() ?></h2>
        <!-- Contenitore della lista di film ottenuta dall'API, ha il titolo della pagina nell'attributo data-actor -->
        <div id="movies-container" class="gridContainer" data-actor="<?php the_title() ?>">Loading...</div>

        <?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'mesmerize' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->
</article><!-- #post-## -->


                       