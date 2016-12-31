// @flow

import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import { withTheme } from 'styled-components/native';
import TransparentTextOverlay from '../TransparentTextOverlay';
import OwnerAvatar from './_OwnerAvatar';

import {
  ContentRow,
  FullView,
  HighlightContainerRow1,
  LeftColumn,
  MainColumn,
  RepositoryContentContainer,
  smallAvatarWidth,
  StyledText,
} from './__CardComponents';

import { contentPadding, radius } from '../../styles/variables';
import { trimNewLinesAndSpaces } from '../../utils/helpers';
import type { User, ThemeObject } from '../../utils/types';

@withTheme
export default class extends React.PureComponent {
  props: {
    user: User,
    additionalInfo?: ?string,
    narrow?: boolean,
    theme?: ThemeObject,
  };

  render() {
    const { additionalInfo, narrow, user, theme, ...props } = this.props;

    if (!user) return null;

    const _login = trimNewLinesAndSpaces(user.get('login'));
    if (!_login) return null;

    return (
      <ContentRow narrow={narrow} {...props}>
        <LeftColumn center>
          <OwnerAvatar url={user.get('avatar_url')} size={smallAvatarWidth} />
        </LeftColumn>

        <MainColumn>
          <HighlightContainerRow1>
            <FullView>
              <TransparentTextOverlay
                color={theme.base01}
                size={contentPadding}
                from="horizontal"
                radius={radius}
              >
                <RepositoryContentContainer>
                  <StyledText numberOfLines={1}>
                    <Icon name="person" />&nbsp;
                    {_login}
                    {additionalInfo && <StyledText muted> {additionalInfo}</StyledText>}
                  </StyledText>
                </RepositoryContentContainer>
              </TransparentTextOverlay>
            </FullView>
          </HighlightContainerRow1>
        </MainColumn>
      </ContentRow>
    );
  }
}