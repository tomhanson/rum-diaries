<header id=top role=banner>
  <?php get_template_part('templates/logo'); ?>
  <nav id="nav" role="navigation">
    <?php
      if (has_nav_menu('primary_navigation')) :
//        wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']);
      endif;
      ?>
      <ul>
        <li role="presentation">
          <a href="/about">About</a>
        </li>
        <li role=presentation>
          <a href="/contact">Contact</a>
        </li>
        <li role="presentation">
          <a id="cat-trigger" href="#">Categories
            <span></span>
          </a>
        </li>
        <ul class="subnav">
          <li class="go--back">
            <a href="#">Main Menu</a>
          </li>
          <li role="presentation">
            <a href="/category/dark-rum">Dark Rum</a>
          </li>
          <li role="presentation">
            <a href="/category/venezuela">Venezuela</a>
          </li>
          <li>
            <a href="#" class="__deadspace"></a>
          </li>
        </ul>
      </ul>
  </nav>
  <a id="nav-trigger" href=""#" class="burger">
    <span></span>
  </a>
</header>
