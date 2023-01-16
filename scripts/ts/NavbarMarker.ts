/// <reference path ="../../node_modules/@types/jquery/JQuery.d.ts"/> 

jQuery(function () {
  const url = window.location; // Get window url

  // Check all anchor elements' href to find which is the same as the current page's url
  $('.navbar ul li a').each(function () {
      const currElement = this as HTMLAnchorElement;

      // Element and current page have the same url
      if (url.href === currElement.href) {
          MakeActive(currElement);
      }

      if (url.pathname == "/" && currElement.href.includes("Home")) {
          MakeActive(currElement);
      }

      if (currElement.href.includes("Article") && url.href.includes("Article")) {
          MakeActive(currElement);
      }
  });

  function MakeActive(element: HTMLAnchorElement) {
      $(element).parent().addClass('nav-active');
  }
});