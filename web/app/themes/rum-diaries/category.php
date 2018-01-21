<section id="grid">
    <?php while (have_posts()) : the_post(); ?>
        <a href="<?php the_permalink(); ?>" class="tile">
            <?php
            $thumb_id = get_post_thumbnail_id();
            $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'medium', true);
            $thumb_url = $thumb_url_array[0];
            ?>
            <span class="bg-image | tile__img" style="background-image: url(<?php echo $thumb_url; ?>);"></span>
            <span class="tile__title">
                <h2><?php the_title(); ?></h2>
            </span>
            <span class="tile--loader">
                <span></span>
            </span>
            <h3 class="tile__tagline">Tagline</h3>
            <span class="category">
                <i class="fa fa-tag" aria-hidden="true"></i>
                <?php $cats = get_the_category();
                echo print_categories($cats);
                ?>
            </span>
            <span class="tile__meta meta">
                <time class="meta--date" datetime="<?= get_post_time('c', true); ?>"><?= get_the_date(); ?></time>
                <span class="meta--author">
                    <?= get_the_author(); ?>
                </span>
            </span>

        </a>
    <?php endwhile; ?>
</section>
