import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { setModalWalletConnect } from '@/features/modal/modalSlice';
import Button from '@/components/core/Button';
import ButtonIcon from '@/components/core/Button/ButtonIcon';
import Dropdown from '@/components/core/Dropdown';

import css from './index.module.scss';
import iconWallet from './img/wallet.svg'
import iconAddPlaet from './img/icon-add-planet.svg'
import IconArrowDown from './img/IconArrowDown'
import IconNotifications from './img/IconNotifications'
import IconWallet from './img/IconWallet'
import IconLogout from './img/IconLogout'
import IconPlayers from './img/IconPlayers'
import IconProjects from './img/IconProjects'
import IconSettings from './img/IconSettings'

import DropdownNetwork from './DropdownNetwork'


export default function SectionRight() {
    const dispatch = useDispatch()
    const connected = useSelector((state: RootState) => state.tmp.connected)

    return <div className={css.headerSection}>
        {
            connected &&
                <>
                    <Button className={css.buttonAddPlanet}>Add your planet</Button>
                    <ButtonIcon className={css.buttonAddPlanetMobile}>
                        <Image
                            src={iconAddPlaet}
                            alt='icon'
                        />
                    </ButtonIcon>
                </>
        }
        {connected &&
            <Link href='#'>
                <div className={css.iconNotifications}>
                    <IconNotifications />
                </div>
            </Link>
        }
        {
            connected &&
                <DropdownNetwork/>
        }
        <Dropdown
            className={css.buttonWalletDropdown}
            classNameMenu={css.buttonWalletDropdownMenu}
            disabled={!connected}
            items={[
                {
                    name: 'Wallet address',
                    icon: <IconWallet />
                },
                {
                    name: 'Logout',
                    icon: <IconLogout />
                },
                {
                    name: 'Player',
                    icon: <IconPlayers />,
                    link: '/account'
                },
                {
                    name: 'Project',
                    icon: <IconProjects />
                },
                {
                    name: 'Settings',
                    icon: <IconSettings />,
                    link: '/settings'
                },
            ]}
        >
            <Button
                className={css.buttonWallet}
                onClick={() => !connected && dispatch(setModalWalletConnect(true))}
                animated
                color='dark'
                iconStart={
                    !connected &&
                        <Image
                            className={css.buttonWalletIcon}
                            src={iconWallet}
                            alt='arrow' />

                }
                iconEnd={
                    connected && <div className={css.buttonWalletArrow}>
                        <IconArrowDown />
                    </div>
                }
            >
                <div className={[css.buttonWalletText, connected && css.buttonWalletTextActive].join(' ')}>
                    {connected ? 'Connected' : 'Connect wallet'}
                </div>
            </Button>
            <ButtonIcon
                className={css.buttonWalletMobile}
                onClick={() => !connected && dispatch(setModalWalletConnect(true))}
                color='dark'
            >
                <Image
                    className={css.buttonWalletIcon}
                    src={iconWallet}
                    alt='arrow' />
            </ButtonIcon>
        </Dropdown>
    </div>
}