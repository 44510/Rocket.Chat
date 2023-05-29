import { Modal, Button, Box, Icon } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import type { ComponentProps, ReactElement } from 'react';
import React from 'react';

type ValidateMatrixIdModalProps = {
	_matrixIdVerifiedStatus: Map<string, string>;
	onClose: () => void;
	onConfirm?: () => void;
};

const verificationStatusAsIcon = (verificationStatus: string) => {
	if (verificationStatus === 'VERIFIED') {
		return 'circle-check';
	}

	if (verificationStatus === 'UNVERIFIED') {
		return 'circle-cross';
	}

	if (verificationStatus === 'UNABLE_TO_VERIFY') {
		return 'circle-exclamation';
	}
};

const ValidateMatrixIdModal = ({ onClose, onConfirm, _matrixIdVerifiedStatus }: ValidateMatrixIdModalProps): ReactElement => {
	const t = useTranslation();

	const matrixIdsAfterValidationList = () =>
		Array.from(_matrixIdVerifiedStatus.entries()).map(([_matrixId, _verificationStatus]) => (
			<li key={_matrixId}>
				{_matrixId}: <Icon name={verificationStatusAsIcon(_verificationStatus) as ComponentProps<typeof Icon>['name']} size='x20' />
			</li>
		));

	return (
		<Modal>
			<Modal.Header>
				<Modal.HeaderText>
					<Modal.Title>Sending Invitations</Modal.Title>
				</Modal.HeaderText>
				<Modal.Close title={t('Close')} onClick={onClose} />
			</Modal.Header>
			<Modal.Content>
				<Box>
					<Box is='ul'>{matrixIdsAfterValidationList()}</Box>
				</Box>
			</Modal.Content>
			<Modal.Footer justifyContent='center'>
				<Modal.FooterControllers>
					<Button onClick={onClose}>{t('Cancel')}</Button>
					{onConfirm && (
						<Button primary onClick={onConfirm}>
							{t('Yes_continue')}
						</Button>
					)}
				</Modal.FooterControllers>
			</Modal.Footer>
		</Modal>
	);
};

export default ValidateMatrixIdModal;
