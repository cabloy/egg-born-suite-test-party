const resources = [
  {
    atomName: 'Article Comment Count',
    atomStaticKey: 'blockArticleCommentCount',
    atomRevision: 0,
    atomCategoryId: 'a-markdown:block.Demonstration',
    resourceType: 'a-markdown:block',
    resourceConfig: JSON.stringify({
      default: {
        interval: 1000,
      },
      validator: {
        module: moduleInfo.relativeName,
        validator: 'blockArticleCommentCount',
      },
    }),
    resourceRoles: 'root',
  },
];
module.exports = resources;
