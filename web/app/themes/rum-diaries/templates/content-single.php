<?php while (have_posts()) : the_post(); ?>
    <article <?php post_class('post'); ?>>


        <div id="target" class="post__wrap article--content __show">
            <header>
                <h1 class="post__title"><?php the_title(); ?></h1>
                <?php get_template_part('templates/entry-meta'); ?>
            </header>
            <section class="post__content article--body">
                <?php the_content(); ?>
                <div class="post__comments">
                    <?php comments_template('/templates/comments.php'); ?>
                </div>
            </section>
            <aside class="sidebar sidebar--post">
                <h2>How does it rate?</h2>
                <?php while(have_rows('rum_ratings') ) : the_row(); ?>
                    <?php the_sub_field('heading'); ?>
                    <?php the_sub_field('rating'); ?>
                <?php endwhile; ?>
            </aside>
            <footer class="post__footer">
                <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
            </footer>

        </div>


    </article>
<?php endwhile; ?>
