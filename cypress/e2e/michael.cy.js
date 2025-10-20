describe('Webpage Loading Time Test', () => {

  it('should load the webpage within acceptable time', () => {
    // Define a threshold for acceptable loading time (in milliseconds)
    const loadTimeThreshold = 1000; // 1 second

    // Visit the website and capture the performance metrics
    cy.visit('http://ugdev.cs.smu.ca:3000/', {
      onBeforeLoad(win) {
        // Mark the moment the page begins to load
        win.performance.mark('loadStart');
      },
      onLoad(win) {
        // Mark the moment the page finishes loading
        win.performance.mark('loadEnd');
        win.performance.measure('pageLoad', 'loadStart', 'loadEnd');
      },
    });

    // Verify the loading time is within the acceptable threshold
    cy.window().then((win) => {
      const measures = win.performance.getEntriesByName('pageLoad');
      const loadTime = measures[0]?.duration;
      cy.log(`Page Load Time: ${loadTime}ms`);
      expect(loadTime).to.be.lessThan(loadTimeThreshold);
    });
  });
});