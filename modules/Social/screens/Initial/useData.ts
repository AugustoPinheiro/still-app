import React from 'react';

import { SocialFeedType } from '@/types/SocialFeedType';

export function useInitialData() {
  const [firstLoading, setFirstLoading] = React.useState(true);

  const [showModal, setShowModal] = React.useState(false);
  const [postSelected, setPostSelected] = React.useState<SocialFeedType | undefined>();
  const postLinks = postSelected
    ? postSelected?.clothing?.filter((item) => Boolean(item.clothing.link))
    : [];

  function handleGoToStore(post: SocialFeedType) {
    setPostSelected(post);
    setShowModal(true);
  }

  return {
    firstLoading,
    handleGoToStore,
    postLinks,
    setFirstLoading,
    setPostSelected,
    showModal,
    setShowModal,
  };
}
