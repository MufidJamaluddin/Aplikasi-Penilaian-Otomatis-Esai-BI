import os
import fnmatch
import sysconfig

from setuptools.command.build_py import build_py as _build_py


def get_ext_paths(root_dir, exclude_files):
    """get filepaths for compilation, by Arthem (https://www.linkedin.com/in/art-vasilyev/)"""
    paths = []

    for root, dirs, files in os.walk(root_dir):
        for filename in files:
            if os.path.splitext(filename)[1] != '.py':
                continue

            file_path = os.path.join(root, filename)
            if file_path in exclude_files:
                continue

            paths.append(file_path)
    return paths


class build_py(_build_py):
    """build only binary, by Arthem (https://www.linkedin.com/in/art-vasilyev/)"""
    def find_package_modules(self, package, package_dir):
        ext_suffix = sysconfig.get_config_var('EXT_SUFFIX')
        modules = super().find_package_modules(package, package_dir)
        filtered_modules = []
        for (pkg, mod, filepath) in modules:
            if os.path.exists(filepath.replace('.py', ext_suffix)):
                continue
            filtered_modules.append((pkg, mod, filepath, ))
        return filtered_modules